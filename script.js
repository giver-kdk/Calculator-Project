
let operands = document.getElementsByClassName("operand");
let operator = document.getElementsByClassName("operator");
let feature = document.getElementsByClassName("feature");

let inputField = document.getElementById("user__input");
let outputField = document.getElementById("final__result");

let prevAns = 0, pressedEqual = false;
const ENTER = 13, BACKSPACE = 8, DELETE = 46;


function decide_key_role(eventObj)
{
	let validInput = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "(", ")"];
	let validAction = [ENTER, BACKSPACE, DELETE];
	let data = eventObj.key;
	if(validInput.includes(eventObj.key))
	{
		console.log("Called Input");
		write_input(eventObj);
	}
	else if(validAction.includes(eventObj.keyCode))
	{
		console.log("Called Action");
		take_action(eventObj);
	}

}
function write_input(eventObject) 
{
	let data;
	if(eventObject.type == "click")
	{data = eventObject.target.innerHTML;}
	else if(eventObject.type == "keypress")
	{data = eventObject.key;}
	if(pressedEqual)
	{
		if((data != "+") && (data != "-") && (data != "×") && (data != "÷"))
		{inputField.innerHTML = ""; 
		outputField.innerHTML = "0";}
		else{inputField.innerHTML = "Ans";}
	}
	pressedEqual = false;
	if(eventObject.type == "click")
	{inputField.insertAdjacentText("beforeend", eventObject.target.innerHTML);}
	else
	{inputField.insertAdjacentText("beforeend", eventObject.key);}
	// console.log(data);

}

function replace_sqrt(expression)
{
	if(expression.indexOf("√") != -1)
	{
		let rootIndex = expression.indexOf("√");
		let rootEnd;
		for(let i = rootIndex; i <= expression.length; i++)
		{
			rootEnd = i;
			if(((expression[i] != "√")) && (expression[i] != ".") && (expression[i] < "0")){break;}
		}
		rootNum = expression.slice(rootIndex, rootEnd);
		squareRoot = Math.sqrt(Number(expression.slice(rootIndex + 1, rootEnd)));
		expression = expression.replace(rootNum, squareRoot);
		// Recursion function to calculate and replace all occurrance of root
		return replace_sqrt(expression);
	}
	else{return expression;}
}
function take_action(eventObject)
{
	let action;
	if(eventObject.type == "click")
	{
		action = eventObject.target.id;
	}
	else if(eventObject.type == "keydown")
	{
		if(eventObject.keyCode == ENTER)
		{action = "result";}
		else if((eventObject.keyCode == BACKSPACE) || (eventObject.keyCode == DELETE))
		{action = "delete";}
		else
		{return;}
	}
	switch(action)
	{
		case "result":
			pressedEqual = true;
			let input = inputField.innerHTML;
			input = input.replaceAll("÷", "/");
			input = input.replaceAll("×", "*");
			input = input.replaceAll("Ans", prevAns);
			input = replace_sqrt(input);
			// console.log(input);
			try
			{
				if(eval(input))
				{
					prevAns = eval(input);
					outputField.innerHTML = prevAns;
				}
				else
				{throw "ERROR";}
			}
			catch(error)
			{outputField.innerHTML = "ERROR";}
			break;
		case "delete":
			if(!pressedEqual)
			{
				let str = inputField.innerHTML;
				// Remove all 3 character of "Ans", if "s" detected
				if(str.charAt(str.length -1) == "s")
				{inputField.innerHTML = str.slice(0, str.length - 3);}
				else
				{inputField.innerHTML = str.slice(0, str.length - 1);}
			}
			break;
		case "clear":
			inputField.innerHTML = "";
			outputField.innerHTML = "0";
			break;
	}

}
// Event Listerners
operands[0].addEventListener("click", write_input);
operands[1].addEventListener("click", write_input);
operands[2].addEventListener("click", write_input);
operands[3].addEventListener("click", write_input);
operands[4].addEventListener("click", write_input);
operands[5].addEventListener("click", write_input);
operands[6].addEventListener("click", write_input);
operands[7].addEventListener("click", write_input);
operands[8].addEventListener("click", write_input);
operands[9].addEventListener("click", write_input);
operands[10].addEventListener("click", write_input);

operator[0].addEventListener("click", write_input);
operator[1].addEventListener("click", write_input);
operator[2].addEventListener("click", write_input);
operator[3].addEventListener("click", write_input);
operator[4].addEventListener("click", write_input);
operator[5].addEventListener("click", write_input);
operator[6].addEventListener("click", write_input);
operator[7].addEventListener("click", write_input);

feature[0].addEventListener("click", take_action);
feature[1].addEventListener("click", take_action);
feature[2].addEventListener("click", take_action);

document.addEventListener("keydown", decide_key_role);
