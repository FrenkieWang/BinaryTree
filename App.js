// Design by Frenkie Wang. Use JavaScript to draw BinaryTree. Edited by Zihao Long.
 
var gameView = document.getElementById("gameView");
var stage = new createjs.Stage(gameView);
var height = 50;//Height between nodes
var width = 15;//Width between nodes
var tops = 40;//Root node to the top
var foot = 40;//Binary tree to the bottom
var spacing = 30;//Tree to the left&right sides
 
var tree = new BinaryTree();
 
function AddOneNumber()
{
    var numbertext = document.getElementById("numbertext").value;
 
    var oneNums = numbertext.match(/[1-9][0-9]{0,2}\,?/);
    document.getElementById("numbertext").value = numbertext.replace(/[1-9][0-9]{0,2}\,?/, "");
 
    var num = (oneNums+"").match(/[1-9][0-9]{0,2}/);
 
    if (num)
    {
        tree.Insert(parseInt(num));
        RenewTreeNode();
    }
}
 
function AddAllNumber()
{
    while (true) {
        AddOneNumber();
        var numbertext = document.getElementById("numbertext").value;
        if (!/[1-9][0-9]{0,2}/.test(numbertext))
        {
            break;
        }
    }
}
 
function DeleteNumber(number)
{
    tree.Remove(parseInt(number));
    RenewTreeNode();
}
 
function RenewTreeNode(number) {
    stage.removeAllChildren();
 
    SetCanvasWidthHeight(tree);
 
    tree.SetPoint();
 
    tree.PreOrder(SetPreOrder);
}
 
function SetCanvasWidthHeight(tree) {
    var level = tree.Level();
    gameView.height = height * level + tops + foot;
    gameView.width = Math.pow(2, level+1) * width + spacing*2;
}
 
function SetPreOrder(node) {
    var container = CreateNode(
        node.Data,
        gameView.width / 2 + width * node.nodePoint,
        (node.nodeLevel * height + parseInt(tops)),
        "red");
    stage.addChild(container);
 
    if (node.Parent != null) {
        var line = CreateLineTo(
            (gameView.width / 2 + width * node.Parent.nodePoint),
            (node.Parent.nodeLevel * height + parseInt(tops)),
            (node.Data, gameView.width / 2 + width * node.nodePoint),
            (node.nodeLevel * height + parseInt(tops)));
        stage.addChild(line);
    }
    stage.update();
}
 
//color=gray red yellow blue  black
function CreateNode(number, x, y, color) {
    var textX = 0;
    if (number < 10) {
        textX = -5;
    } else if (number > 9 && number < 100) {
        textX = -9;
    } else {
        textX = -14;
    }
    var text = new createjs.Text(number, "16px Arial", "#fff");
    text.x = textX;
    text.y = -8;
 
    var graphics = new createjs.Graphics();
    graphics.setStrokeStyle(1);
    graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 255));
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, 15);
    var shape = new createjs.Shape(graphics);
 
    var container = new createjs.Container();
    container.x = x;
    container.y = y;
    container.addChild(shape, text);
 
    container.addEventListener("dblclick", function () {
        DeleteNumber(text.text);
    });
 
    return container;
}
 
function CreateLineTo(fatherNodex, fatherNodey, childrenNodex, childrenNodey) {
    var sp = new createjs.Shape();
    sp.graphics.s("blue").ss(2).mt(fatherNodex, fatherNodey + 15).lt(childrenNodex, childrenNodey - 15).es();//???
    return sp;
}
