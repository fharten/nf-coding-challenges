export function sanitizeInput(input: string): string {
  return input.replace(/[&<>"'\n/]/g, (char) => {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "\n": "<br>", // nicht machen - lieber output als read-only textarea
      }[char] || char
    );
  });
}
