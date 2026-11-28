async function getImplementations() {
    try {
        const manifest = (await fetch("/implementations/manifestByStarset.json"));
        if (!manifest.ok) throw new Error("uhhh shit failed, " + manifest.status);
        const jason = await manifest.json();
        const items = jason.implementations;
        let objects = [];
        for (let i = 0; i < items.length; i++) {
            const stuff = await fetch("/implementations/" + items[i] + "/about.json");
            if (!stuff.ok) throw new Error("uhhh shit failed, " + stuff.status);
            const jason2 = await stuff.json();
            objects.push(jason2);
        }
        return objects;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function makeImplementation(implementation) { // holy FUCKIN WHAT
    const element = document.createElement("div");
    element.setAttribute("class", "implementation-card");
    const info = document.createElement("div");
    info.setAttribute("class", "implementation-info");
    const link = document.createElement("a");
    link.setAttribute("href", implementation.website);
    link.innerText = "Website →";
    const name = implementation.name;
    const logo = document.createElement("img");
    logo.setAttribute("src", "/implementations/" + name + "/" + implementation.logo);
    logo.setAttribute("class", "implementation-logo");
    const langlogo = document.createElement("img");
    langlogo.setAttribute("src", "/implementations/" + name + "/" + implementation.langlogo);
    langlogo.setAttribute("class", "implementation-lang");
    const title = document.createElement("h1");
    title.innerText = name;
    element.appendChild(info);
    const intro = document.createElement("div");
    intro.setAttribute("class", "implementation-intro");
    intro.appendChild(title);
    intro.appendChild(logo);
    info.appendChild(intro);
    const langintro = document.createElement("div");
    langintro.setAttribute("class", "implementation-language");
    const langtitle = document.createElement("p");
    langtitle.innerText = "Written by " + implementation.creator + " in " + implementation.lang + ".";
    langintro.appendChild(langtitle);
    langintro.appendChild(langlogo);
    info.appendChild(langintro);
    const desc = document.createElement("p");
    desc.setAttribute("class", "implementation-description");
    desc.innerHTML = implementation.description;
    const descriptionDiv = document.createElement("div");
    const descriptionHeader = document.createElement("h2");
    descriptionHeader.innerText = "Description:";
    descriptionDiv.appendChild(descriptionHeader);
    descriptionDiv.appendChild(desc);
    const descriptionDivParent = document.createElement("div");
    descriptionDivParent.setAttribute("class", "implementation-stuff");
    descriptionDivParent.appendChild(descriptionDiv);
    descriptionDivParent.appendChild(document.createElement("hr"));
    descriptionDivParent.appendChild(document.createElement("br"));
    descriptionDivParent.appendChild(link);
    element.appendChild(document.createElement("hr"));
    element.appendChild(descriptionDivParent);
    return element;
}