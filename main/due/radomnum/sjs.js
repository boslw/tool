
var sjslen=localStorage.getItem("sjslen");
if(sjslen!=null)
{
$("sjslen").value=sjslen;
}


var sjstype=localStorage.getItem("sjstype");



if(sjstype!=null)
{
var vlist=sjstype.split("-");
for(var i=0;i<vlist.length-1;i++)
{

if(vlist[i]=="1")
{
    $("sel_"+i).checked=true;
}

}
}
else{
    $("sel_0").checked=true;

}




function $(id){return document.getElementById(id);}

function gen()
{

var from_str="";
var vlist="";
for(var i=0;i<4;i++)
{
var id_name="sel_"+i;
if($(id_name).checked==true)
{
from_str+=$(id_name).value;
vlist+="1-";
}
else
{
    vlist+="0-";
}
}


localStorage.setItem("sjstype",vlist);

//alert(from_str.length);
var slen=from_str.length;

if(slen<1)
{
alert("至少选择一种");
return;
}

var sjslen=$("sjslen").value;
localStorage.setItem("sjslen",sjslen);

var result="";

for(var i=0;i<sjslen;i++)
{
    result+=from_str[Math.floor(Math.random() *slen)];
}

$("result").innerHTML=result;
}
