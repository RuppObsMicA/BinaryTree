function Tree (root){

    this.root = root;
    this.addNode = addNode;

    function addNode(value){
        const node = new Node(value);

        if (this.root === null){
            this.root = node;
            return
        }
        insertNode(this.root, node);
    }

    function insertNode(currentNode, newNode){
        if (currentNode.value > newNode.value){
            if (currentNode.leftChild){
                insertNode(currentNode.leftChild, newNode)
            } else {
                currentNode.addLeftChild(newNode);
                drawTree(currentNode, newNode);
            }
        } else if (currentNode.value < newNode.value){
            if (currentNode.rightChild){
                insertNode(currentNode.rightChild, newNode);
            } else {
                currentNode.addRightChild(newNode);
                drawTree(currentNode, newNode);
            }
        } else {
            resetPlaceholder("Duplicate values");
            throw new Error("Duplicates");
        }
    }

}
function Node(value){
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
    this.value = value;
    this.addRightChild = addRightChild;
    this.addLeftChild = addLeftChild;

    function addRightChild(node){
        node.parent = this;
        this.rightChild = node;
    }

    function addLeftChild(node){
        node.parent = this;
        this.leftChild = node;
    }
}

const root = new Node(10);
const tree = new Tree(root);

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = "700";

const textarea = document.querySelector(".textArea");
const form = document.getElementById("form");
form.addEventListener("submit", getNumberFromTextarea);

function getNumberFromTextarea(e){  //starts when we click on the button
    e.preventDefault();

    // let secondOptionOfReceivedValue = this.rowForNumber.value; // just to show it also works
    // console.log(secondOptionOfReceivedValue);

    let newNUmber = e.target[0].value;
    if (Number.isNaN(Number(newNUmber)) || newNUmber === ""){
        resetPlaceholder("Wrong number, enter a number");
    } else {
        tree.addNode(Number(newNUmber));
        resetPlaceholder("Enter a number");
    }
}

function drawTree (currentNode, newNode){
    const currentDiv = document.getElementById(currentNode.value);   //receive a parent div to insert a child inside

    // setting DataOfNewChild
    const newDiv = document.createElement("div");
    newDiv.classList.add("newNode");
    newDiv.id = newNode.value;   //Need to set it because we draw every new node based on parent's id
    newDiv.style.width = document.getElementById(currentNode.value).offsetWidth / 2+"px";   //receive width of a parent
    newDiv.innerHTML = "<div class='circleNumber'>" + newNode.value + "</div>";
    if (currentNode.value > newNode.value){   //Check if we need to move a new div left or right
        newDiv.style.float = "left";
    } else {
        newDiv.style.float = "right";
    }
    if (currentNode.rightChild === null || currentNode.leftChild === null)    //Adds br if we add the first child only, if we add the second child we don't need one more br
          currentDiv.appendChild(document.createElement("br"));

    //create a new element
    currentDiv.appendChild(newDiv);

                                // create two variable to receive a div circle inside rectangle divs
    const circleInParentDiv = currentDiv.firstChild.getBoundingClientRect();
    const circleInNewDiv = newDiv.firstChild.getBoundingClientRect();

                                //try to set point closer to the middle of circle
                                //scrollY adds additional defend if scrolled the page
    let xOfParent = circleInParentDiv.x + circleInParentDiv.width/2;
    let yOfParent = circleInParentDiv.y + circleInParentDiv.height/2 + window.scrollY;
    let xOfChild = circleInNewDiv.x + circleInNewDiv.width/2;
    let yOfChild = circleInNewDiv.y + circleInNewDiv.height/2 + window.scrollY;

    createLine(xOfParent, yOfParent, xOfChild, yOfChild);
}

function resetPlaceholder(message){     //Changes placeholder in textarea
    textarea.setAttribute("placeholder", message);
    textarea.value = "";
}

function createLine(xParent, yParent, xChild, yChild){
    ctx.lineWidth = 4;
    ctx.strokeStyle = "aqua";
    ctx.beginPath();
    ctx.moveTo(xParent, yParent);
    ctx.lineTo(xChild, yChild);
    ctx.stroke();
}





