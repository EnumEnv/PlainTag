////////////////////////
// Configuration Maps //
///////////////////////
/**
 * All error message format functions for main.js.
 */
const ErrorMessages = {
   componentObjectMissing: (name) => {
      return `<PlainTag> Component of tag ${name} couldn't load because it isn't registered.`;
   },

   componentElementMissing: (name) => {
      return `<PlainTag> Component of tag ${name} couldn't load because element is undefined.`;
   },

   chosenParentMissing: (name) => {
      return `<PlainTag> Component of tag ${name} couldn't load because parent can not be found.`;
   },
};

/**
 * Defaults of all paremeters in main.js.
 */
const Defaults = {
   props: undefined,
   parent: "body",
   position: "append",
   unloadAll: false,
};

/**
 * If is in debug or not.
 */
const debug = false;

/// DEBUG ///
if (debug) {
   console.log("<PlainTag> Starting...");
}

///////////////////
// Internal Maps //
//////////////////
/**
 * All the registered components in a map.
 */
const ComponentRegistry = {};

////////////////////////
// Internal Functions //
///////////////////////
/**
 * Checks if the ComponentObject is in the registry.
 * @param { string } name --> Name of the component.
 * @returns { boolean } --> Success
 */
const _verifyComponentObject = (name) => {
   return (
      (ComponentRegistry[name] && true) ||
      console.error(ErrorMessages.componentObjectMissing(name))
   );
};

/**
 * Debug log function.
 * @param { string } str --> Console log output.
 */
const _debugLog = (str) => {
   if (debug) {
      console.log(str);
   }
};

/**
 * Returns a new promise which also is there to wait until document.body exists.
 * @returns { Promise }
 */
function _bodyLoaded() {
   return new Promise((resolve) => {
      const interval = setInterval(() => {
         if (document.body) {
            clearInterval(interval);
            resolve();
         }
      }, 100);
   });
}

/**
 * Verifies if element exists in compoonent.
 * @param { string } name --> Name of the component.
 * @returns --> Success
 */
const _verifyComponentElement = (name, opened) => {
   return (
      (opened.element && true) ||
      console.error(ErrorMessages.componentElementMissing(name))
   );
};

/**
 * Verifies if the parent of a component is missing or not.
 * @param { string } name --> Name of the component.
 * @param { string } parent --> Parent of the component.
 * @returns
 */
const _verifyParentMissing = (name, parent) => {
   return (
      (parent && true) || console.error(ErrorMessages.chosenParentMissing(name))
   );
};

////////////////////
// API Functions //
///////////////////
/**
 * Parses component CSS style data.
 * @param {*} cssString
 */
const parseCssString = (cssString) => {
   if (typeof cssString == "undefined") {
      console.warn(
         "<Minor PlainTag Error> Your CSS Style builder function in a component is empty (undefined)."
      );
      return;
   }

   const styleSheet = document.createElement("style");
   styleSheet.innerText = cssString;
   document.head.appendChild(styleSheet);
};

/**
 * Registers a component to the global registry.
 * @param { string } name --> Name of the component.
 * @param { function } component --> Component to add.
 * @param { function } style --> Component's style builder function.
 */
const RegisterComponent = (name, component, style) => {
   parseCssString(style() || undefined); // Parses the component's styles.
   ComponentRegistry[name] = component; // Adds the component to the global registry.
};

/**
 * Loads a component onto the HTML document.
 * @param { string } name --> Name of the component.
 * @param { object } props --> Props object to pass through. Default: undefined
 * @param { string } parent --> Parent element name. Default: "body"
 * @param { string } position --> Position. Default: "append"
 * @returns
 */
async function LoadComponent(
   name,
   props = Defaults.props,
   parent = Defaults.parent,
   position = Defaults.position
) {
   /// Debug ///
   _debugLog("<PlainTag> Started component load. 1/4");

   // Wait for body //
   if (!document.body) {
      await _bodyLoaded();
   }

   // Dependency Check //
   _verifyComponentObject(name);
   _verifyParentMissing(name, document.querySelector(parent));

   /// Debug ///
   _debugLog("<PlainTag> Loading component. 2/4");

   // Top Data //
   const componentInRegistry = ComponentRegistry[name];
   const openedUpComponent = componentInRegistry(props);
   _verifyComponentElement(name, openedUpComponent);

   // Final Data //
   const componentElement = openedUpComponent.element;
   const chosenParent = document.querySelector(parent);

   // Assign Data //
   componentElement.classList.add(name);

   /// Debug ///
   _debugLog("<PlainTag> Visualizing component. 3/4");

   // Visualization //
   if (position == "append") {
      chosenParent.append(componentElement);
   }

   /// Debug ///
   _debugLog("<PlainTag> Visualized component. 4/4");
}

/**
 * Unloads a specific component by name.
 * @param { string } componentName --> Name of the component.
 */
const UnloadComponent = (componentName, unloadAll = Defaults.unloadAll) => {
   /// Debug ///
   _debugLog("<PlainTag> Unloading component. 1/3");

   // Dependency Check //
   _verifyComponentObject(componentName);

   /// Debug ///
   _debugLog("<PlainTag> Unloading component. 2/3");

   // Top Data //
   const elements = document.getElementsByClassName(componentName);
   const element = (unloadAll && [...elements]) || elements[0];

   // Check //
   if (!element) {
      return;
   }

   // Final //
   if (Array.isArray(element)) {
      for (let t_element of element) {
         t_element.remove();
      }

      /// Debug ///
      _debugLog("<PlainTag> Unloaded component. 3/3");
   } else if (element) {
      element.remove();
   } else {
      // Notification //
      console.log("<PlainTag> Failed to unload component. Query not found.");

      /// Debug ///
      _debugLog("<PlainTag> Stopped at step 2. Couldn't unload component.");
   }
};

/// Debug ///
_debugLog("<PlainTag> Started...");
console.log(ComponentRegistry);
