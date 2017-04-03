jQuery(document).ready(function($) {
	$("a[orderstatus]").click(function() {
		var orderstatus = $(this).attr("orderstatus");
		if("all"==orderstatus) {
			$("table[orderstatus]").show();
		}
		else {
			$("table[orderstatus]").hide();
			$("table[orderstatus="+orderstatus+"]").show();
			// "+orderstatus+"拼接变量orderstatus中保存的字符串
		}
		$("div.orderType div").removeClass("selectedOrderType");
		$(this).parent("div").addClass("selectedOrderType");
	})
});