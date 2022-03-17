const WritingStatus = {
  Todo: "todo",
  InProgress: "inprogress",
  ToReview: "toreview",
  Done: "done",
};

figma.showUI(__html__, { width: 300, height: 260 });
const getBody = (text) =>
  Uint8Array.from(text.split("").map((letter) => letter.charCodeAt(0)));

const getNodeLink = (text) => {
  const ids = text.id.split(";");
  const shareId = (ids[1] || ids[0]).replace("I", "");
  return `https://www.figma.com/file/${figma.fileKey}/?node-id=${shareId}`;
};

const changeName = (name, status = WritingStatus.Todo) =>
  ({
    [WritingStatus.Todo]: `🔴  ${name} - [TO DO]`,
    [WritingStatus.InProgress]: `🟠   ${name} - [IN PROGRESS]`,
    [WritingStatus.ToReview]: `🔵  ${name} - [TO REVIEW]`,
    [WritingStatus.Done]: `✅  ${name} - [DONE]`,
  }[status || WritingStatus.Todo]);

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
    if (msg.status === WritingStatus.Todo) {
      console.log(text, figma.currentPage);
      //@ts-ignore
      fetch(
        "https://hooks.slack.com/workflows/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",
        {
          method: "POST",
          body: getBody(
            JSON.stringify({
              frame_link: getNodeLink(text),
            })
          ),
        }
      );
    }
  });
  figma.notify(`change ${texts.length} node statuses to ${msg.status}`, {
    timeout: 1500,
  });
};
