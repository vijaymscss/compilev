import React, { useState, useEffect } from "react";
import OutputHeader from "./OutputHeader";
import Output from "./Output";
import { reviewCodeWithGemini } from "../services/api";
import { Sparkle } from "lucide-react";

function StarRating({ rating }) {
  // rating: number from 0 to 5
  return (
    <div className='flex items-center gap-1 mt-2'>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill={i <= rating ? "#facc15" : "#d1d5db"} // yellow for rated, gray for unrated
          stroke={i <= rating ? "#facc15" : "#d1d5db"}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <polygon points='10 2 12.59 7.36 18.51 7.97 14 12.14 15.18 18.02 10 15.1 4.82 18.02 6 12.14 1.49 7.97 7.41 7.36 10 2' />
        </svg>
      ))}
    </div>
  );
}

function parseOptimizedSections(optimizedCodeRaw) {
  // Extract code block, explanation, and other sections
  if (!optimizedCodeRaw) return { code: "", explanation: "" };
  let code = "",
    explanation = "";
  // Extract code block (```...```)
  const codeBlockMatch = optimizedCodeRaw.match(/```[\s\S]*?\n([\s\S]*?)```/);
  code = codeBlockMatch ? codeBlockMatch[1].trim() : "";
  // Extract explanation (after **Explanation of Optimizations:** or similar)
  const explanationMatch = optimizedCodeRaw.match(/\*\*Explanation[\s\S]*?\*\*:?([\s\S]*)/i);
  explanation = explanationMatch ? explanationMatch[1].trim() : "";
  return { code, explanation };
}

export default function OutputPanel({ current, runCode, output, error, setOutput, setError, ready = true, code }) {
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewResult, setReviewResult] = useState(null);
  const [tab, setTab] = useState("output"); // "output" or "ai"

  // Switch to output tab when code is executed
  useEffect(() => {
    if ((output && output.trim() !== "") || (error && error.trim() !== "")) {
      setTab("output");
    }
  }, [output, error]);

  const handleReview = async () => {
    setReviewLoading(true);
    setReviewError("");
    setReviewResult(null);
    try {
      const result = await reviewCodeWithGemini({ code, language: current.id });
      setReviewResult(result);
    } catch (e) {
      setReviewError(e.message || "Unknown error");
    } finally {
      setReviewLoading(false);
    }
  };

  // Parse optimized code and explanation if available
  const optimizedSections = reviewResult ? parseOptimizedSections(reviewResult.optimizedCode) : { code: "", explanation: "" };

  return (
    <div className='flex h-full flex-col gap-2 pl-2'>
      <OutputHeader
        languageName={current.name}
        onRun={runCode}
        onClear={() => {
          setOutput("");
          setError("");
        }}
        ready={ready && !reviewLoading}
      />
      {/* Tab Menu */}
      <div className='flex gap-2 border-b mb-2'>
        <button className={`px-4 py-2 font-medium ${tab === "output" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`} onClick={() => setTab("output")}>
          Output
        </button>
        <button className={`px-4 py-2 font-medium ${tab === "ai" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"} ${!output && !error ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => (output || error ? setTab("ai") : null)} disabled={!output && !error}>
          AI Feedback
        </button>
      </div>
      {/* Tab Content */}
      <div className='flex-1 min-h-0'>
        {tab === "output" ? (
          <Output
            output={output}
            error={error}
            languageLabel={current.name.toLowerCase()}
            placeholderIcon={
              <svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='h-24 w-24 text-muted-foreground'>
                <polygon points='5 3 19 12 5 21 5 3'></polygon>
              </svg>
            }
          />
        ) : (
          <div className='h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground dark:scrollbar-thumb-[#374151] dark:scrollbar-track-[#111827]'>
            <div className='mt-2 p-3'>
              {/* Review from AI button only in AI Feedback tab */}
              <div className='mb-4 '>
                <button id='review-ai-btn' onClick={handleReview} disabled={!ready || reviewLoading} className='flex gap-2 px-2 py-1.5 bg-[#6366f1] text-white hover:bg-[#6366f1] rounded-md disabled:opacity-50 disabled:pointer-events-none'>
                  <Sparkle /> Get feedback from AI
                </button>

                {!reviewLoading && !reviewResult && !reviewError && <div className='text-muted-foreground text-sm pt-3'>Click 'Get feedback from AI' to get feedback and optimization suggestions for your code.</div>}
              </div>
              {reviewLoading && <div className='text-sm text-blue-500'>Reviewing code with AI...</div>}
              {reviewError && <div className='text-sm text-red-500'>{reviewError}</div>}
              {reviewResult && (
                <>
                  <div className='bg-card border rounded-lg p-4 mt-2'>
                    <div className='font-semibold mb-1'>AI Feedback:</div>
                    <div className='mb-2 whitespace-pre-line text-sm'>{reviewResult.feedback}</div>
                    <div className='font-semibold mb-1 mt-2'>Rating:</div>
                    <StarRating rating={reviewResult.rating} />
                  </div>
                  {optimizedSections.code && (
                    <div className='bg-muted border rounded-lg p-4 mt-2'>
                      <div className='font-semibold mb-1'>Optimized Code:</div>
                      <pre className='rounded p-2 text-xs overflow-x-auto mb-2'>{optimizedSections.code}</pre>
                    </div>
                  )}
                  {optimizedSections.explanation && (
                    <div className='bg-muted border rounded-lg p-4 mt-2'>
                      <div className='font-semibold mb-1'>Explanation:</div>
                      <div className='whitespace-pre-line text-sm'>{optimizedSections.explanation}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
