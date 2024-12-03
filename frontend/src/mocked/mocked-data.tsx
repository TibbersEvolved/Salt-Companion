export const mockedCourseData = [
  {
    id: "1",
    value: "java, oop",
    label: "Java & OOP",
  },
  {
    id: "2",
    value: "spring, advanced java",
    label: "Spring and Advanced Java",
  },
  {
    id: "3",
    value: "html, css",
    label: "HTML and CSS",
  },
  {
    id: "4",
    value: "web apis, spring mvc",
    label: "Web APIs & Spring MVC",
  },
  {
    id: "5",
    value: "javascript, Typescript",
    label: "JavaScript, TypeScript",
  },
  {
    id: "6",
    value: "react",
    label: "React",
  },
  {
    id: "7",
    value: "databases, spring jpa",
    label: "Databases & Spring JPA",
  },
  {
    id: "8",
    value: "security, automation",
    label: "Security and Automation",
  },
  {
    id: "9",
    value: "cloud",
    label: "Cloud",
  },
];

export const mockedQuiz = [
  // Java & OOP
  {
    topic: "Java & OOP",
    question: "What is polymorphism in Object-Oriented Programming?",
    answers: [
      "The ability of an object to take on many forms",
      "The process of hiding the internal details of an object",
      "The act of creating a new class from an existing class",
      "The use of static methods in a class",
    ],
    correctAnswer: "The ability of an object to take on many forms",
  },
  {
    topic: "Java & OOP",
    question:
      "What does the `final` keyword mean when applied to a class in Java?",
    answers: [
      "The class cannot be extended",
      "The class cannot contain any methods",
      "The class cannot be instantiated",
      "The class cannot have any static members",
    ],
    correctAnswer: "The class cannot be extended",
  },
  {
    topic: "Java & OOP",
    question: "Which feature is specific to Java's interface?",
    answers: [
      "Supports multiple inheritance",
      "Allows private constructors",
      "Can be instantiated directly",
      "Supports static method overriding",
    ],
    correctAnswer: "Supports multiple inheritance",
  },
  {
    topic: "Java & OOP",
    question: "What is encapsulation in OOP?",
    answers: [
      "Bundling data and methods that operate on that data together",
      "Hiding implementation details from the user",
      "Creating a new class from an existing class",
      "Allowing methods to take multiple forms",
    ],
    correctAnswer:
      "Bundling data and methods that operate on that data together",
  },
  {
    topic: "Java & OOP",
    question:
      "Which principle allows using a superclass reference to call subclass methods?",
    answers: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"],
    correctAnswer: "Polymorphism",
  },

  // Spring and Advanced Java
  {
    topic: "Spring and Advanced Java",
    question: "What does the `@Autowired` annotation in Spring do?",
    answers: [
      "It injects dependencies automatically",
      "It initializes the Spring context",
      "It configures application properties",
      "It creates a new HTTP session",
    ],
    correctAnswer: "It injects dependencies automatically",
  },
  {
    topic: "Spring and Advanced Java",
    question:
      "What is the purpose of Spring Boot’s `application.properties` file?",
    answers: [
      "To provide configuration for the application",
      "To define data access objects",
      "To store runtime logs",
      "To handle asynchronous events",
    ],
    correctAnswer: "To provide configuration for the application",
  },
  {
    topic: "Spring and Advanced Java",
    question: "What does the `@Qualifier` annotation do in Spring?",
    answers: [
      "It specifies which bean to inject when multiple options are available",
      "It defines a new scope for a bean",
      "It initializes a bean lazily",
      "It configures security settings for a bean",
    ],
    correctAnswer:
      "It specifies which bean to inject when multiple options are available",
  },
  {
    topic: "Spring and Advanced Java",
    question: "What is a Bean Factory in Spring?",
    answers: [
      "A lightweight container that manages bean lifecycles",
      "A factory that generates HTTP requests",
      "A tool for compiling Java classes",
      "A mechanism for handling asynchronous tasks",
    ],
    correctAnswer: "A lightweight container that manages bean lifecycles",
  },
  {
    topic: "Spring and Advanced Java",
    question: "What is AOP (Aspect-Oriented Programming) in Spring?",
    answers: [
      "A way to modularize cross-cutting concerns like logging or security",
      "A framework for building RESTful APIs",
      "An alternative to Spring Boot for lightweight applications",
      "A tool for managing database transactions",
    ],
    correctAnswer:
      "A way to modularize cross-cutting concerns like logging or security",
  },

  // HTML and CSS
  {
    topic: "HTML and CSS",
    question: "What does the CSS property `z-index` control?",
    answers: [
      "The stack order of elements",
      "The opacity of an element",
      "The position of an element relative to its container",
      "The margin around an element",
    ],
    correctAnswer: "The stack order of elements",
  },
  {
    topic: "HTML and CSS",
    question: "What is the default position value in CSS?",
    answers: ["static", "relative", "absolute", "fixed"],
    correctAnswer: "static",
  },
  {
    topic: "HTML and CSS",
    question: "What does the `<header>` tag represent in HTML?",
    answers: [
      "A container for introductory content or navigational links",
      "The main content of the document",
      "A sidebar containing additional content",
      "A container for footer links",
    ],
    correctAnswer: "A container for introductory content or navigational links",
  },
  {
    topic: "HTML and CSS",
    question: "What does the CSS `flex-grow` property do?",
    answers: [
      "Defines how much a flex item will grow relative to others",
      "Specifies the spacing between flex items",
      "Aligns flex items along the main axis",
      "Sets the size of a flex container",
    ],
    correctAnswer: "Defines how much a flex item will grow relative to others",
  },
  {
    topic: "HTML and CSS",
    question: "What is the purpose of the `viewport` meta tag in HTML?",
    answers: [
      "To control the layout and scaling of content on mobile devices",
      "To define the style of a web page",
      "To load external CSS files",
      "To set the title of a web page",
    ],
    correctAnswer:
      "To control the layout and scaling of content on mobile devices",
  },

  // Web APIs & Spring MVC
  {
    topic: "Web APIs & Spring MVC",
    question:
      "What is the purpose of the `@RestController` annotation in Spring?",
    answers: [
      "To define a controller that handles RESTful web services",
      "To bind a service to a database",
      "To secure the application endpoints",
      "To handle exceptions in the application",
    ],
    correctAnswer: "To define a controller that handles RESTful web services",
  },
  {
    topic: "Web APIs & Spring MVC",
    question: "What does the HTTP status code 201 indicate?",
    answers: [
      "A resource was successfully created",
      "The request was successful but no content was returned",
      "The request was malformed",
      "The client is not authorized to access the resource",
    ],
    correctAnswer: "A resource was successfully created",
  },
  {
    topic: "Web APIs & Spring MVC",
    question: "What is the main purpose of the `@RequestMapping` annotation?",
    answers: [
      "To map HTTP requests to specific handler methods",
      "To define the transaction scope of a service",
      "To configure a database connection",
      "To handle exceptions in a controller",
    ],
    correctAnswer: "To map HTTP requests to specific handler methods",
  },
  {
    topic: "Web APIs & Spring MVC",
    question: "What is HATEOAS in REST APIs?",
    answers: [
      "A principle that links resources dynamically to improve discoverability",
      "A protocol for encrypting API requests",
      "A standard for defining API response formats",
      "A framework for securing RESTful services",
    ],
    correctAnswer:
      "A principle that links resources dynamically to improve discoverability",
  },
  {
    topic: "Web APIs & Spring MVC",
    question: "What does CORS stand for?",
    answers: [
      "Cross-Origin Resource Sharing",
      "Content-Oriented Response Syntax",
      "Custom-Origin Request System",
      "Client-Oriented Routing Service",
    ],
    correctAnswer: "Cross-Origin Resource Sharing",
  },
  {
    topic: "JavaScript, TypeScript",
    question: "What is the difference between `let` and `var` in JavaScript?",
    answers: [
      "`let` has block scope while `var` has function scope",
      "`var` is immutable while `let` is mutable",
      "`let` is deprecated while `var` is not",
      "`var` requires initialization while `let` does not",
    ],
    correctAnswer: "`let` has block scope while `var` has function scope",
  },
  {
    topic: "JavaScript, TypeScript",
    question: "What does the `tsconfig.json` file do in a TypeScript project?",
    answers: [
      "It specifies the compiler options and project structure",
      "It defines the runtime for TypeScript code",
      "It lists the external libraries used by the project",
      "It configures the package manager for the project",
    ],
    correctAnswer: "It specifies the compiler options and project structure",
  },
  {
    topic: "JavaScript, TypeScript",
    question: "What does the `map()` method in JavaScript do?",
    answers: [
      "Creates a new array by applying a function to each element of an array",
      "Filters elements of an array based on a condition",
      "Finds the first element in an array that meets a condition",
      "Sorts an array in ascending or descending order",
    ],
    correctAnswer:
      "Creates a new array by applying a function to each element of an array",
  },
  {
    topic: "JavaScript, TypeScript",
    question: "What is the purpose of `type` in TypeScript?",
    answers: [
      "To define custom types or aliases",
      "To specify global variables",
      "To enforce strict mode in a script",
      "To declare an interface",
    ],
    correctAnswer: "To define custom types or aliases",
  },
  {
    topic: "JavaScript, TypeScript",
    question: "What does the `Promise.all()` method do?",
    answers: [
      "It resolves all promises and returns their results as an array",
      "It waits for the first promise to resolve and returns its result",
      "It cancels all pending promises if one fails",
      "It chains multiple promises into a single sequence",
    ],
    correctAnswer:
      "It resolves all promises and returns their results as an array",
  },

  // React
  {
    topic: "React",
    question: "What is the purpose of `useState` in React?",
    answers: [
      "To manage local state in a functional component",
      "To fetch data from a remote server",
      "To share state across multiple components",
      "To trigger re-renders based on lifecycle events",
    ],
    correctAnswer: "To manage local state in a functional component",
  },
  {
    topic: "React",
    question: "What is the virtual DOM in React?",
    answers: [
      "A lightweight representation of the actual DOM",
      "A replacement for the real DOM in the browser",
      "A tool for rendering static HTML pages",
      "A debugging feature for React applications",
    ],
    correctAnswer: "A lightweight representation of the actual DOM",
  },
  {
    topic: "React",
    question: "What is `prop drilling` in React?",
    answers: [
      "Passing props through multiple layers of components unnecessarily",
      "Optimizing props to avoid performance issues",
      "Using a library to manage component props",
      "Binding props to DOM elements in React",
    ],
    correctAnswer:
      "Passing props through multiple layers of components unnecessarily",
  },
  {
    topic: "React",
    question: "What is the role of `React.StrictMode`?",
    answers: [
      "To highlight potential problems in the application during development",
      "To improve application performance in production",
      "To enable lazy loading of components",
      "To automatically manage component state",
    ],
    correctAnswer:
      "To highlight potential problems in the application during development",
  },
  {
    topic: "React",
    question: "What does `useContext` provide in React?",
    answers: [
      "Access to context values without needing to pass props manually",
      "A way to fetch data from an API",
      "A mechanism for state management in Redux",
      "A replacement for `useState` in functional components",
    ],
    correctAnswer:
      "Access to context values without needing to pass props manually",
  },

  // Databases & Spring JPA
  {
    topic: "Databases & Spring JPA",
    question: "What does the `@GeneratedValue` annotation do in JPA?",
    answers: [
      "Automatically generates the primary key value for an entity",
      "Defines a unique constraint for a column",
      "Specifies the fetch type for a relationship",
      "Maps a column to an entity field",
    ],
    correctAnswer:
      "Automatically generates the primary key value for an entity",
  },
  {
    topic: "Databases & Spring JPA",
    question: "What is a primary key in a database?",
    answers: [
      "A unique identifier for a record in a table",
      "A foreign key that references another table",
      "A column used for indexing purposes",
      "A constraint that enforces null values",
    ],
    correctAnswer: "A unique identifier for a record in a table",
  },
  {
    topic: "Databases & Spring JPA",
    question: "What does the `@OneToMany` annotation represent in JPA?",
    answers: [
      "A relationship where one entity is related to many others",
      "A unidirectional relationship between two entities",
      "A many-to-many relationship between tables",
      "A join table created for a composite key",
    ],
    correctAnswer: "A relationship where one entity is related to many others",
  },
  {
    topic: "Databases & Spring JPA",
    question: "What is the purpose of an `EntityManager` in JPA?",
    answers: [
      "To manage the lifecycle of entities and database interactions",
      "To handle transaction management in Spring",
      "To validate database schema during runtime",
      "To perform CRUD operations using SQL",
    ],
    correctAnswer:
      "To manage the lifecycle of entities and database interactions",
  },
  {
    topic: "Databases & Spring JPA",
    question: "What does the term `lazy loading` mean in JPA?",
    answers: [
      "Fetching related data only when it is accessed",
      "Loading all data at the start of the transaction",
      "Caching query results for faster access",
      "Avoiding database queries by using static data",
    ],
    correctAnswer: "Fetching related data only when it is accessed",
  },

  // Security and Automation
  {
    topic: "Security and Automation",
    question: "What does the `bcrypt` algorithm do in Spring Security?",
    answers: [
      "Hashes passwords for secure storage",
      "Encrypts API requests",
      "Handles OAuth token generation",
      "Authenticates users using LDAP",
    ],
    correctAnswer: "Hashes passwords for secure storage",
  },
  {
    topic: "Security and Automation",
    question: "What is the purpose of CSRF protection in web applications?",
    answers: [
      "To prevent unauthorized commands from being executed on behalf of a user",
      "To encrypt sensitive data sent over the network",
      "To validate user sessions for secure authentication",
      "To handle cross-origin requests safely",
    ],
    correctAnswer:
      "To prevent unauthorized commands from being executed on behalf of a user",
  },
  {
    topic: "Security and Automation",
    question: "What does the `@Scheduled` annotation do in Spring?",
    answers: [
      "It schedules a method to run at a specific interval or time",
      "It initializes beans in a specific order",
      "It triggers database migrations automatically",
      "It loads configuration files on application startup",
    ],
    correctAnswer:
      "It schedules a method to run at a specific interval or time",
  },
  {
    topic: "Security and Automation",
    question: "What is the main purpose of OAuth 2.0?",
    answers: [
      "To provide secure delegated access to resources",
      "To encrypt data during transmission",
      "To validate user identities through LDAP",
      "To manage passwords in web applications",
    ],
    correctAnswer: "To provide secure delegated access to resources",
  },
  {
    topic: "Security and Automation",
    question: "What is the role of the `SecurityContext` in Spring Security?",
    answers: [
      "To store details about the currently authenticated user",
      "To define access control rules for endpoints",
      "To encrypt and decrypt sensitive data",
      "To initialize secure connections for APIs",
    ],
    correctAnswer: "To store details about the currently authenticated user",
  },
];

export const flashCard = [
  {
    id: 1,
    question: "What is JavaScript?",
    answer:
      "JavaScript is a programming language that enables you to interact with web pages.",
  },
  {
    id: 2,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 3,
    question: "What is TypeScript?",
    answer:
      "TypeScript is a superset of JavaScript that adds static typing to the language.",
  },
  {
    id: 4,
    question: "What is HTML?",
    answer:
      "HTML is a markup language that is used to create the structure of a web page.",
  },
  {
    id: 5,
    question: "What is CSS?",
    answer:
      "CSS is a styling language that is used to control the layout and appearance of a web page.",
  },
  {
    id: 6,
    question: "What is a component?",
    answer:
      "A component is a reusable piece of code that can be used to build user interfaces.",
  },
  {
    id: 7,
    question: "What is a prop?",
    answer:
      "A prop is a way to pass data from a parent component to a child component.",
  },
  {
    id: 8,
    question: "What is Java?",
    answer:
      "Java is a programming language that is used to build applications that can run on any platform.",
  },
  {
    id: 9,
    question: "What is OOP?",
    answer:
      "OOP stands for Object-Oriented Programming, which is a programming paradigm that uses objects to model real-world entities.",
  },
  {
    id: 10,
    question: "What is a bean?",
    answer:
      "A bean is a Java class that is used to encapsulate data and provide methods to access and manipulate that data.",
  },
];
