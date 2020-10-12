var acc = document.getElementsByClassName("mobilemenu");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


$('#with-my-template').gCalFlow({
    calid: 'linuxfoundation.org_34363837313836302d343036@resource.calendar.google.com',
    mode: 'updates',
    maxitem: 20,
    auto_scroll: false,
    daterange_formatter: function (start_date, end_date, allday_p) {
    function pad(n) { return n < 10 ? "0"+n : n; }
    return pad(start_date.getMonth()+1) + "/" + pad(start_date.getDate()) + " - " + pad(end_date.getMonth()+1) + "/" + pad(end_date.getDate());
    }
});
   

