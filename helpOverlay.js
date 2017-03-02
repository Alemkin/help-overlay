/** @suppress{duplicate} */
var helpOverlay = {}; // namespace

/**
 * Add the help overlay SVG panel.
 */
helpOverlay.addSVG = function () {
    var svg = $("<div id='helpsvg' style='width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:absolute;top:0;left:0;z-index:2000'><svg xmlns='http://www.w3.org/2000/svg' style='width:100%;height:100%'><defs><marker id='head' orient='auto' markerWidth='2' markerHeight='4' refX='0.1' refY='2'><path id='headpoly' d='M0,0 V4 L2,2 Z' fill='black'/></marker></defs></svg></div").click(helpOverlay.remove);
    $(document.body).append(svg);
}

helpOverlay.remove = function () {
    var svg = $('#helpsvg');
    if (!svg) {
        return;
    }
    svg.remove();
}

/**
 * Add a help label to the specified position.
 * @param {number} tox
 * @param {number} toy
 * @param {string} label
 * @param {string} pos
 * @param {number=} length
 */
helpOverlay.addLabel = function (tox, toy, label, pos, length, xaway, yaway) {
    var svg = $('#helpsvg svg');
    if (!svg || svg.length < 1) {
        return;
    }
    var awayx;
    var awayy;

    if(xaway) {
      awayx = xaway;
    } else {
      awayx = 15;
    }
    if(yaway) {
      awayy = yaway;
    } else {
      awayy = 30;
    }


    if (pos.indexOf("top") > -1) {
        awayy *= -1;
    }

    if (pos.indexOf("left") > -1) {
        awayx *= -1;
    }

    if (length) {
        awayx *= length;
        awayy *= length;
    }

    var fromx = tox + awayx;
    var fromy = toy + awayy;
    var labelawayx = -100;
    var labelawayy = awayy > 0 ? 25 : -20;
    var color = 'white';
    var fonttype = 'Papyrus, fantasy';

    var midx = fromx;
    var midy = toy;
    var ns = "http://www.w3.org/2000/svg";

    var path = document.createElementNS(ns, "path");
    path.setAttribute('marker-end', 'url(#head)');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('d', 'M' + fromx + ',' + fromy + ' Q' + midx + ',' + midy + ' ' + tox + ',' + toy);

    var text = document.createElementNS(ns, "text");
    text.setAttribute('x', fromx + labelawayx);
    text.setAttribute('y', fromy + labelawayy);
    text.setAttribute('fill', color);
    text.setAttribute('font-size', 25);
    text.setAttribute('font-family', fonttype);
    var data = document.createTextNode(label);
    text.appendChild(data);

    document.getElementById('headpoly').setAttribute('fill', color);

    svg.append(path);
    svg.append(text);
}

/**
 * Add help label to an element on the screen.
 * @param {jQuery} dom
 * @param {string} label
 * @param {string} pos
 * @param {number=} length
 * @param {number=} xaway
 * @param {number=} yaway
 */
helpOverlay.addLabelTo = function (dom, label, pos, length, xaway, yaway) {
    if (!dom) {
        return;
    }
    var svg = $('#helpsvg');
    if (!svg || svg.length < 1) {
        helpOverlay.addSVG();
    }
    var offset = dom.offset();
    var width = dom.width();
    var height = dom.height();
    if (length && length < 0) {
      helpOverlay.addLabel(offset.left, offset.top, label, pos, length, xaway, yaway);
    }
    else if (length && xaway && yaway && xaway < 0 && yaway > 0) {
      helpOverlay.addLabel(offset.left, offset.top + height / 2, label, pos, length, xaway, yaway);
    }
    else if (length && xaway && yaway && xaway > 0 && yaway < 0) {
      helpOverlay.addLabel(offset.left + width / 2, offset.top, label, pos, length, xaway, yaway);
    }
    else if (length && xaway && yaway && xaway < 0 && yaway < 0) {
      helpOverlay.addLabel(offset.left, offset.top, label, pos, length, xaway, yaway);
    }
    else {
      helpOverlay.addLabel(offset.left + width / 2, offset.top + height / 2, label, pos, length, xaway, yaway);
    }
}
