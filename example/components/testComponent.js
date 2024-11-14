// Component Metadata
/**
 * All the metadata for the component
 */
const COMPONENT_NAME = "testComponent";

/**
 * The component builder functions.
 * @param { object } props
 * @returns { element }
 */
const Component = (props) => {
   let element = make("div");
   insertIn(element, "h2", `Hello ${props.name}`);

   tag(element, "TestTag");
   classSet(element, "TestClass");

   return parse(element);
};

/**
 * The main style definition function for the component.
 * @returns { string }
 */
const Style = () => {
   return `
   .testComponent {
      padding: 4%;
      background-color: red;
      border-style: solid;
      border-width: 1.2rem;
      border-color: yellow;
   }
   `;
};

// Register component to registry
RegisterComponent(COMPONENT_NAME, Component, Style);
