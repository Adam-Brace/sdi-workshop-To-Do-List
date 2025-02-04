const container = document.querySelector("main");

document.querySelector("#add").addEventListener("click", () => add());
document
	.querySelector("h1")
	.addEventListener("click", () => edit(document.querySelector("#header")));
document.addEventListener("DOMContentLoaded", () => {
	let save = localStorage.getItem("todo");

	save = JSON.parse(save);
	if (save) {
		save.todo.forEach((text) => {
			let task = document.createElement("div");
			let p = document.createElement("p");

			task.classList.add("task");
			p.classList.add("todo");

			p.innerHTML = text.text;
			document.querySelector("title").innerHTML = save.title;
			if (text.complete) {
				p.style.textDecoration = "line-through";
			}

			task.appendChild(p);
			container.appendChild(task);

			p.addEventListener("click", () => edit(task));

			console.log("Task added:", task);
		});
		console.log("Loaded", save);
	} else {
		console.log("Nothing to load", save);
	}
});

function add() {
	let task = document.createElement("div");
	let p = document.createElement("p");

	task.classList.add("task");
	p.classList.add("todo");

	task.appendChild(p);
	container.appendChild(task);

	p.addEventListener("click", () => edit(task));

	edit(task);
	console.log("Task added:", task);
}

function edit(element) {
	let form = document.createElement("form");
	let exitBtn = document.createElement("button");
	let killBtn = document.createElement("button");
	let completeBtn = document.createElement("button");
	let editInp = document.createElement("input");
	let br = document.createElement("br");
	let text = element.children[0];

	br = [br.cloneNode(true), br.cloneNode(true)];

	text.style.display = "none";
	editInp.type = "text";
	exitBtn.type = "button";
	killBtn.type = "button";
	completeBtn.type = "button";

	editInp.value = text.innerHTML;
	exitBtn.innerHTML = "X";
	completeBtn.innerHTML = "Complete";
	killBtn.innerHTML = "Delete";
	exitBtn.classList.add("exitBtn");
	completeBtn.classList.add("completeBtn");
	killBtn.classList.add("killBtn");

	element.appendChild(form);
	form.appendChild(exitBtn);
	form.appendChild(br[0]);
	form.appendChild(editInp);
	if (text.tagName !== "H1") {
		form.appendChild(br[1]);
		form.appendChild(completeBtn);
		form.appendChild(killBtn);
	}

	exitBtn.addEventListener("click", () => exit(form, text, editInp.value));
	editInp.addEventListener("keydown", () => {
		if (event.key === "Enter") {
			exit(form, text, editInp.value);
		}
	});
	killBtn.addEventListener("click", () => kill(element));
	completeBtn.addEventListener("click", () =>
		complete(text, editInp.value, exit(form, text, editInp.value))
	);

	console.log("Editor opened:", element);
}

function exit(element, text, value) {
	if (value == " " || value.length < 1) {
		alert("To Do's cannot be empty");
	} else {
		text.style.display = "block";
		text.innerHTML = value;
		if (text.tagName === "H1") {
			document.querySelector("title").innerHTML = value;
		}
		console.log("Editor closed:", element);
		element.remove();
		saving();
	}
}

function complete(text, value) {
	if (value == " " || value.length < 1) {
		alert("To Do's cannot be empty");
	} else {
		if (text.style.textDecoration === "line-through") {
			text.style.textDecoration = "none";
		} else {
			text.style.textDecoration = "line-through";
		}
		console.log("Task complete", text);
		saving();
	}
}

function kill(task) {
	task.remove();
	saving();
}

function saving() {
	let save = { title: "", todo: [] };

	localStorage.removeItem("todo");
	save.title = document.querySelector("H1").innerHTML;
	document.querySelectorAll(".todo").forEach((p) => {
		if (p.style.textDecoration === "line-through") {
			save.todo.push({ text: p.innerHTML, complete: true });
		} else {
			save.todo.push({ text: p.innerHTML, complete: false });
		}
	});

	localStorage.setItem("todo", JSON.stringify(save));

	console.log("Saved:", save);
}
