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
    
    if (ansiCode) {
      if (ansiCode === 1) {
        text += "\x1b[1m";
      } else if (ansiCode === 4) {
        text += "\x1b[4m";
      } else {
        text += `\x1b[${ansiCode}m`;
      }
      
      text += nodesToANSI(element.childNodes);
      
      text += "\x1b[0m";
    } else {
      text += nodesToANSI(element.childNodes);
    }
  });

  return text;
}
