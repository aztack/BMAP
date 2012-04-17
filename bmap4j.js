(function ($) {
    var $ERROR = {
        notInitialized: "BMap not initialized,call toBMap on a <div> first"
    };
    var $APIConfig = {
        "BMap:config": {
            "enableDragging": ["none", "启用地图拖拽，默认启用。"],
            "disableDragging": ["none", "禁用地图拖拽。"],
            "enableScrollWheelZoom": ["none", "启用滚轮放大缩小，默认禁用。"],
            "disableScrollWheelZoom": ["none", "禁用滚轮放大缩小。"],
            "enableDoubleClickZoom": ["none", "启用双击放大，默认启用。"],
            "disableDoubleClickZoom": ["none", "禁用双击放大。"],
            "enableKeyboard": ["none", "启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级。"],
            "disableKeyboard": ["none", "禁用键盘操作。"],
            "enableInertialDragging": ["none", "启用地图惯性拖拽，默认禁用。"],
            "disableInertialDragging": ["none", "禁用地图惯性拖拽。"],
            "enableContinuousZoom": ["none", "启用连续缩放效果，默认禁用。"],
            "disableContinuousZoom": ["none", "禁用连续缩放效果。"],
            "enablePinchToZoom": ["none", "启用双指操作缩放，默认启用。"],
            "disablePinchToZoom": ["none", "禁用双指操作缩放。"],
            "enableAutoResize": ["none", "启用自动适应容器尺寸变化，默认启用。"],
            "disableAutoResize": ["none", "禁用自动适应容器尺寸变化。"],
            "setDefaultCursor(cursor:String)": ["none", "设置地图默认的鼠标指针样式。参数cursor应符合CSS的cursor属性规范。"],
            "getDefaultCursor": ["String", "返回地图默认的鼠标指针样式。"],
            "setDraggingCursor(cursor:String)": ["none", "设置拖拽地图时的鼠标指针样式。参数cursor应符合CSS的cursor属性规范。"],
            "getDraggingCursor": ["String", "返回拖拽地图时的鼠标指针样式。"],
            "setMinZoom(zoom:Number)": ["none", "设置地图允许的最小级别。取值不得小于地图类型所允许的最小级别。"],
            "setMaxZoom(zoom:Number)": ["none", "设置地图允许的最大级别。取值不得大于地图类型所允许的最大级别。"]
        },
        "BMap:status": [
	        "getBounds", "Bounds", "返回地图可视区域，以地理坐标表示。",
	        "getCenter", "Point", "返回地图当前中心点。",
	        "getDistance(start:Point, end:Point)", "Number", "返回两点之间的距离，单位是米。(自 1.1 新增)",
	        "getMapType", "MapType", "返回地图类型。(自 1.1 新增)",
	        "getSize", "Size", "返回地图视图的大小，以像素表示。",
	        "getViewport(view: Array<Point>[, viewportOptions: ViewportOptions])", "Viewport", "根据提供的地理区域或坐标获得最佳的地图视野，返回的对象中包含center和zoom属性，分别表示地图的中心点和级别。此方法仅返回视野信息，不会将新的中心点和级别做用到当前地图上。(自 1.1 新增)",
	        "getZoom", "Number", "返回地图当前缩放级别。"
        ],
        "BMap:manipulation": [
        ]
    };

    /**
    * 构造函数
    * 在指定的容器内创建地图实例
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