class Link {
  constructor(title, url, author) {
    let finalUrl = url;
    if (
      !finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")
    ) {
        finalUrl = `http://${finalUrl}`;
    }
    this.title = title;
    this.author = author;
    this.url = finalUrl;
  }
  toString() {
    return `${this.title} (${this.url}). Author: ${this.author}`;
  }
}

const contentElement = document.getElementById("content");

function createLinkElement(link) {
  const titleElement = document.createElement("a");
  titleElement.href = link.url;
  titleElement.classList.add("linkTitle");
  titleElement.appendChild(document.createTextNode(link.title));

  const urlElement = document.createElement("span");
  urlElement.classList.add("linkUrl");
  urlElement.appendChild(document.createTextNode(link.url));

  const headlineElement = document.createElement("h4");
  headlineElement.classList.add("linkHeadline");
  headlineElement.appendChild(titleElement);
  headlineElement.appendChild(urlElement);

  const authorElement = document.createElement("span");
  authorElement.classList.add("linkAuthor");
  authorElement.appendChild(
    document.createTextNode(`by ${link.author}`)
  );


  const linkElement = document.createElement("div");
  linkElement.classList.add("link");
  linkElement.appendChild(headlineElement);
  linkElement.appendChild(authorElement);

  return linkElement;
};


function createInputElement (name, placeholder, size){
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.setAttribute("name", name);
  inputElement.setAttribute("placeholder", placeholder);
  inputElement.setAttribute("size", size);
  inputElement.setAttribute("required", "true");
  inputElement.classList.add("form-control");
  return inputElement;
};

function createLinkForm () {
  const authorElement = createInputElement("author", "Enter author", 10);
  const titleElement = createInputElement("title", "Enter link title", 20);
  const urlElement = createInputElement("url", "Enter link URL", 20);

  const submitElement = document.createElement("input");
  submitElement.type = "submit";
  submitElement.value = "Add link";
  submitElement.classList.add("btn");
  submitElement.classList.add("btn-primary");

  const linkFormElement = document.createElement("form");
  linkFormElement.classList.add("linkForm");
  linkFormElement.classList.add("form-inline");
  linkFormElement.appendChild(authorElement);
  linkFormElement.appendChild(titleElement);
  linkFormElement.appendChild(urlElement);
  linkFormElement.appendChild(submitElement);

  linkFormElement.addEventListener("submit", e => {
    e.preventDefault();

    const newLink = new Link(
      titleElement.value,
      urlElement.value,
      authorElement.value
    );

    const newLinkElement = createLinkElement(newLink);
    contentElement.replaceChild(newLinkElement, e.target);

    const infoElement = document.createElement("div");
    infoElement.classList.add("alert");
    infoElement.classList.add("alert-success");
    infoElement.textContent = `The link ${newLink.title} has been succesfully added!`;
    contentElement.insertBefore(infoElement, newLinkElement);
    setTimeout(() => {
      contentElement.removeChild(infoElement);
    }, 2000);
    const formElement = createLinkForm();
    contentElement.insertBefore(formElement, document.querySelector(".link"));
  });

  return linkFormElement;
};

const links = [];
links.push(new Link("Spotify", "https://www.spotify.com/us/", "Spotify"));
links.push(new Link("Reddit", "https://reddit.com", "Reddit"));
links.push(new Link("Yahoo", "Yahoo.com", "Yahoo"));

for (link of links) {
  const linkElement = createLinkElement(link);
  contentElement.appendChild(linkElement);
};

const formElement = createLinkForm();
contentElement.insertBefore(formElement, document.querySelector(".link"))