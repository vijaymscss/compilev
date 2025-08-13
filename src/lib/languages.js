export const SUPPORTED_LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "logos:javascript",
    monaco: "javascript",
    piston: { language: "javascript", version: "18.15.0" },
    template: `// JavaScript
console.log('Hello, World!')`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "logos:typescript-icon",
    monaco: "typescript",
    piston: { language: "typescript", version: "5.0.3" },
    template: `// TypeScript
function greet(name: string) 
{ 
return 'Hello, ' + name 
}
console.log(greet('World'))`,
  },
  {
    id: "python",
    name: "Python",
    icon: "logos:python",
    monaco: "python",
    piston: { language: "python", version: "3.10.0" },
    template: `# Python
print('Hello, World!')`,
  },
  {
    id: "java",
    name: "Java",
    icon: "logos:java",
    monaco: "java",
    piston: { language: "java", version: "15.0.2" },
    template: `// Java
public class Main 
{ 
  public static void main(String[] args) 
  { 
    System.out.println("Hello, World!"); 
  } 
}`,
  },
  {
    id: "c",
    name: "C",
    icon: "logos:c",
    monaco: "c",
    piston: { language: "c", version: "10.2.0" },
    template: `// C
#include <stdio.h>
int main(){
    printf("Hello, World!");
    return 0; 
}`,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "logos:cpp",
    monaco: "cpp",
    piston: { language: "cpp", version: "10.2.0" },
    template: `// C++
#include <bits/stdc++.h>
using namespace std;
int main(){ 
    cout << "Hello, World!"; 
    return 0; 
}`,
  },
  {
    id: "go",
    name: "Go",
    icon: "logos:go",
    monaco: "go",
    piston: { language: "go", version: "1.20.2" },
    template: `// Go
package main
import "fmt"

func main(){ 
  fmt.Println("Hello, World!") 
}`,
  },
];

export const getLanguageById = (id) => SUPPORTED_LANGUAGES.find((l) => l.id === id);
