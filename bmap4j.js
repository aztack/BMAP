(function ($) {
    var $ERROR = {
        notInitialized: "BMap not initialized,call toBMap on a <div> first"
    };
    var $APIConfig = {
        "BMap:config": {
            "enableDragging": ["none", "���õ�ͼ��ק��Ĭ�����á�"],
            "disableDragging": ["none", "���õ�ͼ��ק��"],
            "enableScrollWheelZoom": ["none", "���ù��ַŴ���С��Ĭ�Ͻ��á�"],
            "disableScrollWheelZoom": ["none", "���ù��ַŴ���С��"],
            "enableDoubleClickZoom": ["none", "����˫���Ŵ�Ĭ�����á�"],
            "disableDoubleClickZoom": ["none", "����˫���Ŵ�"],
            "enableKeyboard": ["none", "���ü��̲�����Ĭ�Ͻ��á����̵��ϡ��¡����Ҽ��������ƶ���ͼ��ͬʱ����������������ʹ��ͼ���жԽ��ƶ���PgUp��PgDn��Home��End����ʹ��ͼƽ����1/2�Ĵ�С��+��-����ʹ��ͼ�Ŵ����Сһ����"],
            "disableKeyboard": ["none", "���ü��̲�����"],
            "enableInertialDragging": ["none", "���õ�ͼ������ק��Ĭ�Ͻ��á�"],
            "disableInertialDragging": ["none", "���õ�ͼ������ק��"],
            "enableContinuousZoom": ["none", "������������Ч����Ĭ�Ͻ��á�"],
            "disableContinuousZoom": ["none", "������������Ч����"],
            "enablePinchToZoom": ["none", "����˫ָ�������ţ�Ĭ�����á�"],
            "disablePinchToZoom": ["none", "����˫ָ�������š�"],
            "enableAutoResize": ["none", "�����Զ���Ӧ�����ߴ�仯��Ĭ�����á�"],
            "disableAutoResize": ["none", "�����Զ���Ӧ�����ߴ�仯��"],
            "setDefaultCursor(cursor:String)": ["none", "���õ�ͼĬ�ϵ����ָ����ʽ������cursorӦ����CSS��cursor���Թ淶��"],
            "getDefaultCursor": ["String", "���ص�ͼĬ�ϵ����ָ����ʽ��"],
            "setDraggingCursor(cursor:String)": ["none", "������ק��ͼʱ�����ָ����ʽ������cursorӦ����CSS��cursor���Թ淶��"],
            "getDraggingCursor": ["String", "������ק��ͼʱ�����ָ����ʽ��"],
            "setMinZoom(zoom:Number)": ["none", "���õ�ͼ�������С����ȡֵ����С�ڵ�ͼ�������������С����"],
            "setMaxZoom(zoom:Number)": ["none", "���õ�ͼ�������󼶱�ȡֵ���ô��ڵ�ͼ�������������󼶱�"]
        },
        "BMap:status": [
	        "getBounds", "Bounds", "���ص�ͼ���������Ե��������ʾ��",
	        "getCenter", "Point", "���ص�ͼ��ǰ���ĵ㡣",
	        "getDistance(start:Point, end:Point)", "Number", "��������֮��ľ��룬��λ���ס�(�� 1.1 ����)",
	        "getMapType", "MapType", "���ص�ͼ���͡�(�� 1.1 ����)",
	        "getSize", "Size", "���ص�ͼ��ͼ�Ĵ�С�������ر�ʾ��",
	        "getViewport(view: Array<Point>[, viewportOptions: ViewportOptions])", "Viewport", "�����ṩ�ĵ����������������ѵĵ�ͼ��Ұ�����صĶ����а���center��zoom���ԣ��ֱ��ʾ��ͼ�����ĵ�ͼ��𡣴˷�����������Ұ��Ϣ�����Ὣ�µ����ĵ�ͼ������õ���ǰ��ͼ�ϡ�(�� 1.1 ����)",
	        "getZoom", "Number", "���ص�ͼ��ǰ���ż���"
        ],
        "BMap:manipulation": [
        ]
    };

    /**
    * ���캯��
    * ��ָ���������ڴ�����ͼʵ��
    */
    $.fn.toBMap = function toMap(container, lng, lat, zoom) {
        if (typeof container === "undefined" || container === null) {
            throw Error("Argument Error!");
        }
        var map = new BMap.Map(container);
        map.centerAndZoom(new BMap.Point(lng, lat), (zoom || 11));

        //map successfully initialized
        this.data("$bmap$", map);
    };

    function _lower1st(a) { return a.toLowerCase(); }
    function _upper1st(a) { return a.toUpperCase(); }
    var i = 0, methods = $APIConfig['BMap:config'], method, fnName, methodName, returnType, description;
    for (methodName in methods) {
        metaData = methods[methodName];
        methodName = metaData[0];
        returnType = metaData[1];
        description = metaData[2];

        if (/enable/.test(methodName)) {
            fnName = methodName.replace(/enable([A-Z])/, '');
            if (typeof methods["disable" + fnName] !== "function") {
                return;
            }
            $.fn[fnName.replace(/^[A-Z]/, _lower1st)] = function (value) {
                var map = this.data("$bmap$");
                if (!map) throw Error($ERROR.notInitialized);
                if (value === true) {
                    map["enable" + fnName].call(map);
                } else {
                    map["disable" + fnName].call(map);
                }
                return this;
            }
        }
        method.name = methodName;
        method.returnType = returnType;
        method.description = description;
    }

} (jQuery));