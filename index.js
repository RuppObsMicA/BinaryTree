function Tree (root){

    this.root = root;
    this.addNode = addNode;    //why don't we use parenthesis here?

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
            resetPlaceholder();
            document.querySelector(".textArea").setAttribute("placeholder", "Duplicate values");
            throw new Error("Duplicate values")
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

    //why don't we have a function to create a parent
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

document.querySelector(".button").addEventListener("click", getNumberFromTextarea);

function getNumberFromTextarea(){  //starts when we click on the button
    const numberFromTextarea = document.querySelector(".textArea");
    if (Number.isNaN(Number(numberFromTextarea.value))){
        resetPlaceholder();
        numberFromTextarea.placeholder = "Wrong number, enter a number";
    } else if (numberFromTextarea.value === ""){
        resetPlaceholder();
        numberFromTextarea.placeholder = "Wrong number, enter a number";
    } else {
        tree.addNode(Number(numberFromTextarea.value));
        resetPlaceholder();
    }

}

function drawTree (currentNode, newNode){
    const currentDiv = document.getElementById(currentNode.value);   //receive a parent div to insert a child inside
    currentDiv.appendChild(setDataOfNewChild());

    function setDataOfNewChild(){
        const newDiv = document.createElement("div");
        newDiv.classList.add("newNode");
        newDiv.id = newNode.value;   //Need to set it because we draw every new node based on parent's id
        newDiv.style.width = document.getElementById(currentNode.value).offsetWidth/2+"px";   //receive width of a parent
        if (currentNode.value > newNode.value){   //Check if we need to move a new div left or right
            newDiv.style.float = "left";
        } else {
            newDiv.style.float = "right";
        }
        newDiv.innerHTML = "<div class='circleNumber'>" + newNode.value + "</div>";
        if (currentNode.rightChild === null || currentNode.leftChild === null)    //Adds br if we add the first child only, if we add the second child we don't need one more br
            currentDiv.appendChild(document.createElement("br"));
        return newDiv;
    }
}

function resetPlaceholder(){     //Changes placeholder in textarea
    document.querySelector(".textArea").setAttribute("placeholder", "Enter a number");
    document.querySelector(".textArea").value = null;
}





