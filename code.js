// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "todo") {
    let successCount = 0,
      layerCount = figma.currentPage.selection.length;
    if (layerCount === 0) {
      figma.notify("Select at least one Text Layer");
    }
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "TEXT") {
        console.log(node);
        //Here we need to clean the name if it already contains one of the emojis or one of the status Texts
        node.name = "🔴 " + node.name + " TO DO";
        successCount++;
      } else {
        figma.notify(
          '⚠️ "' +
            node.name +
            '" name was not reset. A text layer must be selected.',
          { timeout: 4000 }
        );
      }
    });
    if (layerCount > 1 && successCount > 1) {
      figma.notify("✅ " + successCount + " text layer names reset", {
        timeout: 2000,
      });
    } else if (successCount == 1) {
      figma.notify("✅ Text layer name reset", { timeout: 2000 });
    }
  }

  if (msg.type === "inprogress") {
    let successCount = 0,
      layerCount = figma.currentPage.selection.length;
    if (layerCount === 0) {
      figma.notify("Select at least one Text Layer");
    }
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "TEXT") {
        //Here we need to clean the name if it already contains one of the emojis or one of the status Texts
        node.name = "🟠 " + node.name + " IN PROGRESS";
        successCount++;
      } else {
        figma.notify(
          '⚠️ "' +
            node.name +
            '" name was not reset. A text layer must be selected.',
          { timeout: 4000 }
        );
      }
    });
    if (layerCount > 1 && successCount > 1) {
      figma.notify("✅ " + successCount + " text layer names reset", {
        timeout: 2000,
      });
    } else if (successCount == 1) {
      figma.notify("✅ Text layer name reset", { timeout: 2000 });
    }
  }

  if (msg.type === "toreview") {
    let successCount = 0,
      layerCount = figma.currentPage.selection.length;
    if (layerCount === 0) {
      figma.notify("Select at least one Text Layer");
    }
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "TEXT") {
        //Here we need to clean the name if it already contains one of the emojis or one of the status Texts
        node.name = "🔵 " + node.name + " TO REVIEW";
        successCount++;
      } else {
        figma.notify(
          '⚠️ "' +
            node.name +
            '" name was not reset. A text layer must be selected.',
          { timeout: 4000 }
        );
      }
    });
    if (layerCount > 1 && successCount > 1) {
      figma.notify("✅ " + successCount + " text layer names reset", {
        timeout: 2000,
      });
    } else if (successCount == 1) {
      figma.notify("✅ Text layer name reset", { timeout: 2000 });
    }
  }

  if (msg.type === "done") {
    let successCount = 0,
      layerCount = figma.currentPage.selection.length;
    if (layerCount === 0) {
      figma.notify("Select at least one Text Layer");
    }
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "TEXT") {
        //Here we need to clean the name if it already contains one of the emojis or one of the status Texts
        node.name = "✅ " + node.name + " DONE";
        successCount++;
      } else {
        figma.notify(
          '⚠️ "' +
            node.name +
            '" name was not reset. A text layer must be selected.',
          { timeout: 4000 }
        );
      }
    });
    if (layerCount > 1 && successCount > 1) {
      figma.notify("✅ " + successCount + " text layer names reset", {
        timeout: 2000,
      });
    } else if (successCount == 1) {
      figma.notify("✅ Text layer name reset", { timeout: 2000 });
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
