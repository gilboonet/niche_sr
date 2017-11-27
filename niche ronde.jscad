// gilboo.js
function chPolyToPts(ch) { // retourne un tableau comportant les points du polygone depuis chaine
var poly, pp, pts, i;

poly = ch.slice(9,-2).replace(/\]/g, "").replace(/\[/g, "");
poly = poly.replace(/\/\*.+?\*\//g, "");
pp = poly.split(',');
pts = [];
	
for(i=0; i<pp.length; i+=2)
	pts.push([pp[i], pp[i+1]]);

return pts;
}

function ptsToPoly(p){ return CAG.fromPoints(p);} // retourne polygone depuis tableau de points

function trancheModele(ch){ // Retourne tableau contenant chacun 1 polygone depuis chaine
var re = /(polygon\([^\;]*\)\;)/gm;
return ch.match(re);
}
// fin gilboo.js

// PARAMETRES
function getParameterDefinitions() {
  return [
    { name: 'nbF', type: 'int', initial: 8, caption: "Nb faces:" },
    { name: 'piece', type: 'text', caption: "Mod&egrave;le:",
    initial :'polygon([[29,20],[32,28],[0,36],[0,28],[24,24],[28,0],[40,0]]);'},
    { name: 'couleur', type: 'text', initial: 'BurlyWood', caption: "Couleur:"},
    { name: 'quart', type:'choice', initial: 'N', caption: "Quart?", captions:["Oui","Non"], values:['O', 'N']},
    { name: 'angleTotal', type:'float', initial:360, caption: "Angle Total"},
    { name: 'angleDebut', type:'float', initial:0, caption: "Angle Début"}
  ];
}

function main(params)
{    
    var P, n, csg, r = [];

	pts = trancheModele(params.piece);
	// on ne prend que le premier polygone pts[0]
	P = ptsToPoly(chPolyToPts(pts[0]));
	
    n = params.nbF; // nb de faces
    csg = color(params.couleur, rotate_extrude({fn:n, angle:params.angleTotal, startAngle:params.angleDebut}, P));

    r.push(color([1,0,1,1],csg.translate([0,0,0])));
    
    return r;
}
