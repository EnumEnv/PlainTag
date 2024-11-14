/**
 * Shortcut to create an new element.
 * @param { string } name --> Element name.
 * @returns { Element }
 */
const make = (name) => {
   return (
      (name && document.createElement(name)) ||
      console.warn("Invalid element name, got", name)
   );
};

/**
 * Sets a style attribute of a element to a value.
 * @param { Element } element
 * @param { string } styleAttribute
 * @param { any } value
 */
const styleSet = (element, styleAttribute, value) => {
   element.style[styleAttribute] = value;
};

/**
 * Assigns a tag to the element with a tag name.
 * @param { Element } element
 * @param { Element } tagName
 */
const tag = (element, tagName) => {
   if (tagName == null || typeof tagName != "string") {
      return console.warn(
         'Invalid TagName type. Expected "string" got',
         typeof tagName
      );
   }

   element.id = tagName;
};

/**
 * Assigns a className to the element with a class name.
 * @param { Element } element
 * @param { Element } className
 */
const classSet = (element, className) => {
   if (className == null || typeof className != "string") {
      return console.warn(
         'Invalid ClassName type. Expected "string" got',
         typeof className
      );
   }

   element.className = className;
};

/**
 * Inserts a element into a element.
 * @param { Element } element --> The element to insert inside of.
 * @param { string | Element } tag --> The new element's tag name.
 * @param { string } inner --> What should be between the brackets. (inside)
 */
const insertIn = (element, tag, inner) => {
   let newElement;

   if (tag instanceof Element) {
      newElement = tag;
   } else if (typeof tag === "string") {
      newElement = document.createElement(tag);
   } else {
      console.warn("Tag is neither a string nor an Element.");
      return;
   }

   newElement.textContent = inner || null;
   element.append(newElement);
};

/**
 * Returns component parameters to export.
 * @param { Element } element
 * @param { function } mounted
 * @param { function } unmounted
 * @returns { element, mounted, unmounted }
 */
const parse = (element, mounted = undefined, unmounted = undefined) => {
   return {
      element,
      mounted,
      unmounted,
   };
};
