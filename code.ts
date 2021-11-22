const WritingStatus = {
  Todo: "todo",
  InProgress: "inprogress",
  ToReview: "toreview",
  Done: "done",
};

figma.showUI(__html__, {width: 300, height: 260})

const changeName = (name, status = WritingStatus.Todo) =>
  ({
    [WritingStatus.Todo]: `🔴  ${name} - [TO DO]`,
    [WritingStatus.InProgress]: `🟠   ${name} - [IN PROGRESS]`,
    [WritingStatus.ToReview]: `🔵  ${name} - [TO REVIEW]`,
    [WritingStatus.Done]: `✅  ${name} - [DONE]`,
  }[status || WritingStatus.Todo]);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  const layers = figma.currentPage.selection;
  const texts = layers.filter((layer) => layer.type === "TEXT");
  if (texts.length === 0) {
    figma.notify("Select at least one Text Layer", { timeout: 1500 });
    return;
  }
  texts.forEach((text) => {
    let original = text.getPluginData("original-name");
    if (!original) {
      text.setPluginData("original-name", text.name);
      original = text.name;
    }
    text.setPluginData("status", msg.status);
    text.name = changeName(original, msg.status);
  });
  figma.notify(`change ${texts.length} node statuses to ${msg.status}`, {
    timeout: 1500,
  });
};
