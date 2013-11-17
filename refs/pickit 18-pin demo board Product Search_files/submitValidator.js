function OnNormalSubmit() {
    var re = new RegExp('(&#)|(<(?=(!|\\w|\\%|/)))', 'g');
    // iterate through the all and replace invalid values

    //alert($(':password, text, textarea').length);
    //$(':password, text, textarea').each(function(i, elt) {
    $.each($("input[type='text'], input[type='password'], textarea"), function(i, elt) {

        if ($(elt).is(':password') || $(elt).is(':text') || $(elt).is(':textarea')) {

            //$(elt).val($(elt).val().replace(re, ''));
            $(elt).val(html2empty($(elt).val()));

            //alert(elt.Validators);
            if (elt.Validators) {
                //alert($(elt.Validators).length);
                $(elt.Validators).each(
 						function(elt2) {
 						    if (elt2.isvalid !== undefined && !elt2.isvalid) {
 						        $(elt2).hide();
 						    }
 						}
 			        );
            }
        }
    });
}
function html2empty(str) {
    return str.replace(/[<>]/g, "");
}