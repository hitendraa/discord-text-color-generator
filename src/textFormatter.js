export function nodesToANSI(nodes) {
  let text = "";
  
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      text += node.textContent;
      return;
    }
    
    if (node.nodeName === "BR") {
      text += "\n";
      return;
    }
    
    const element = node;
    const ansiCode = +(element.className.split("-")[1]);
    
    // Simple color code application without state tracking
    if (ansiCode) {
      // Apply formatting
      if (ansiCode === 1) {
        text += "\x1b[1m";
      } else if (ansiCode === 4) {
        text += "\x1b[4m";
      } else {
        text += `\x1b[${ansiCode}m`;
      }
      
      // Process child nodes
      text += nodesToANSI(element.childNodes);
      
      // Reset after this element
      text += "\x1b[0m";
    } else {
      text += nodesToANSI(element.childNodes);
    }
  });

  return text;
}
