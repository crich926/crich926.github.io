var model = {
moduleStr: '',
moduleId: '0',
moduleType: '0',
moduleOrder: '0',
orderLast: '',
modulePane: '0',
addedToAll: 'false',
moveDirection: '0',
pgId: '0'
};
$(document).ready(function () {
if (document.documentMode || /Edge/.test(navigator.userAgent)) {
$('#browserModal').modal();
} else {
$('#browserModal').remove();
}
$('#browserLink').click(function () {
$('#browserModal').modal('hide');
window.open("https://secure.mbsbooks.com/employee/PortalApp/PortalHelp/browser_help.html", "_blank", "");

});
$("#publish").click(function () {
$('#publishModal').modal();
});
$('#publishButton').click(function () {
$('#publishModal').modal('hide');
$('#publishVerifyModal').modal();
});
$('#publishVerifyButton').click(function () {
var css = $("#storeCssFileName").val();
$.ajax({
type: "POST",
url: '/employee/iCMDesign/PublishSite?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: {"css": css},
dataType: "json",
error: function (xhr) {
$('#publishVerifyModal').modal('hide');
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
$('#publishVerifyModal').modal('hide');
$("#mesg-publish").html(data.mesg);
}
});
});
if ($('#leftSection').length) {
} else {
$('#contentSection').removeClass('col-lg-10 col-md-10 col-sm-10');
}
//Add Module
$("#addModule").click(function () {
if ($("#selectedModule").val() == "") {
alert("Please select a module.")
return;
}
if ($("#drpModPanes").val() == "0") {
alert("Please select a section.")
return;
}
model.moduleType = $("#selectedModule").val();
model.orderLast = $("#drpModPosition").val();
model.modulePane = $("#drpModPanes").val();
model.pgId = $("#pgId").val();
var checked = $('#addtoall').is(':checked');
model.addedToAll = checked;
var pgId = $("#pgId").val();
$.ajax({
type: "POST",
url: '/employee/iCMDesign/AddModule?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
//if (data == "True") {
//reload the page
location.reload();
return;
}
});
if ($('#leftSection').length) {
} else {
$('#contentSection').removeClass('col-lg-10 col-md-10 col-sm-10');
}
});
$("#closbtn").click(function () {
$('#myModalContent').html('');
$('#myModal').modal('hide');
});
//Move hover event
$(".dropdownMove").hover(
function () {
$(this).addClass('open');
},
function () {
$(this).removeClass('open');
}
);
$('#h_nav .navbar-nav &gt; li').each(function () {
$(this).removeClass('dropdown-submenu');
});
//Remove Module
});
function remove(Id, all, secId) {
model.moduleId = Id;
model.modulePane = secId;
model.pgId = $("#pgId").val();
if (all == 1) {
//Item added to all show custom confirm, the user choose to remove module from all pages or just current one
$.confirmWithOptions({
'title': 'Delete Confirmation',
'message': 'You are about to delete this item.
It cannot be restored at a later time! Continue?',
'optionsHTML': '

',
'buttons': {
'Yes': {
'class': 'blue',
'action': function () {
var $selection = $('input[name="delete"]:checked').val();
if ($selection == "true") {
model.addedToAll = true;
} else {
model.addedToAll = false;
}
// set model.addedToAll = false if one radio button is slecetd true if removeall is selected
$.ajax({
type: "POST",
url: '/employee/iCMDesign/Delete?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
//Reload the page'
// location.reload();
location.reload();
//});
return;
}
});
}
},
'No': {
'class': 'gray',
'action': function () { }	// Nothing to do in this case. You can as well omit the action property.
}
}
});
}
else {
//Module add to current page just removed form this page after confirmation
$.confirm({
'title': 'Delete Confirmation',
'message': 'You are about to delete this item.
It cannot be restored at a later time! Continue?',
'buttons': {
'Yes': {
'class': 'blue',
'action': function () {
$.ajax({
type: "POST",
url: '/employee/iCMDesign/Delete?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("pmdId=" + Id + "secId=" + secId);
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
// There is no problem with the validation
location.reload();
//});
return;
}
});
}
},
'No': {
'class': 'gray',
'action': function () { }	// Nothing to do in this case. You can as well omit the action property.
}
}
});
}
if ($('#leftSection').length) {
} else {
$('#contentSection').removeClass('col-lg-10 col-md-10 col-sm-10');
}
}
function changorder(Id, direction, secId) {
model.moduleId = Id;
model.moveDirection = direction;
model.modulePane = secId;
model.pgId = $("#pgId").val();
$.ajax({
cache: false,
type: "POST",
url: '/employee/iCMDesign/changeOrder?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
location.reload();
return;
}
});
}
function move(Id, secId) {
model.moduleId = Id;
model.modulePane = secId;
model.pgId = $("#pgId").val();
$.ajax({
cache: false,
type: "POST",
url: '/employee/iCMDesign/Move?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
location.reload();
return;
}
});
if ($('#leftSection').length) {
} else {
$('#contentSection').removeClass('col-lg-10 col-md-10 col-sm-10');
}
}
function copy(Id, secId, e) {
var target = e.target;
var copyID = Id;
var copysecId = secId;
var pgID = $('#pgId').val();
model.moduleId = copyID;
model.modulePane = copysecId;
model.pgId = pgID;
$.ajax({
cache: false,
type: "POST",
url: '/employee/iCMDesign/Copy?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: (model),
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
$(target).parent().parent().parent().parent().parent().parent().prev().text("Module Copied");
return;
}
});
}
function publish(Id, e) {
var target = e.target;
$.ajax({
cache: false,
type: "POST",
url: '/employee/iCMDesign/publish?s=insitestore.mbsbooks.com%2Furisandboxrwd',
data: { "Id": Id },
dataType: "json",
error: function (xhr) {
alert("Critical Error!. Failed to call the server.");
},
success: function (data, jqXHR) {
$(target).parent().parent().parent().parent().parent().parent().prev().text("Text Published");
return;
}
});
}
var popup;
function Edittext(textId, moduleId) {
var url =  '/employee/TextEditor.aspx?tid=' + textId + '&amp;pmdId=' + moduleId + '&amp;s=insitestore.mbsbooks.com/urisandboxrwd';
popup = window.open(url, "Popup", "width=600,height=800");
popup.focus();
}
//This function is called from parent window update targeted text module with new text
function setValue(pmdId, stdId) {
ajaxCallURL = '/employee/iCMDesign/Gettext?s=insitestore.mbsbooks.com%2Furisandboxrwd';
$.ajax({
type: "GET",
url: ajaxCallURL,
contentType: "application/json; charset=utf-8",
data: { "tId": stdId, "pmdId": pmdId },
datatype: "json",
success: function (data) {
$('#addText-' + pmdId).text('Edit Text');
$('#div-' + pmdId).html(data);
},
error: function () {
alert("Content load failed.");
}
});
//alert(" Parent window Alert" + pmdId + "stdId:" + stdId);
}
var ajaxCallURL;
$(function () {
$(".getScript").click(function () {
ajaxCallURL = '/employee/iCMDesign/ShowScript';
$.ajax({
type: "GET",
url: ajaxCallURL,
contentType: "application/json; charset=utf-8",
datatype: "json",
success: function (data) {
$('#myModalContent').html('');
$('#myModalContent').html(data);
$('#myModal').modal('show');
},
error: function () {
alert("Content load failed.");
}
});
});
$(".getGlobal").click(function () {
ajaxCallURL = '/employee/iCMDesign/ShowGlobal';
$.ajax({
type: "GET",
url: ajaxCallURL,
contentType: "application/json; charset=utf-8",
datatype: "json",
success: function (data) {
$('#myModalContent').html('');
$('#myModalContent').html(data);
$('#myModal').modal('show');
},
error: function () {
alert("Content load failed.");
}
});
});
$(".getCss").click(function () {
ajaxCallURL = '/employee/iCMDesign/ShowCss';
$.ajax({
type: "GET",
url: ajaxCallURL,
contentType: "application/json; charset=utf-8",
datatype: "json",
success: function (data) {
$('#myModalContent').html('');
$('#myModalContent').html(data);
$('#myModal').modal('show');
},
error: function () {
alert("Content load failed.");
}
});
});
$("#closbtn").click(function () {
$('#myModalContent').html('');
$('#myModal').modal('hide');
});
});
