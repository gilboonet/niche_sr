// GENERATEUR PARAMETRIQUE DE CIRCONVOLUTIONS
// Gilbert Duval 2016-10-16
//-----------------------------------------------
// Le modele est fourni par l'editeur de chemins
// --> http://gilboo.carton.free.fr/OPSPED/

function getParameterDefinitions() {
  return [
      { name: 'modele', type: 'text', initial: 'polygon([[0,16],[8,16],[16,0],[16,-8],[0,-16],[-8,-16],[-16,0],[-16,8]]);', caption: "Modele:" }
      ,{ name: 'nombre', type: 'int', initial: 3, caption: "Number of walls:" }
      ,{ name: 'epaisseur', type: 'float', initial: 0.2, caption: "Thickness:" }
      ,{ name: 'decalage', type: 'float', initial: 0.0, caption: "Space:" }
      ,{ name: 'inset', type: 'choice', initial:0, values:[0,1], captions:["no inset","inset"] }
      ,{ name: 'outset', type: 'choice', initial:0, values:[0,1], captions:["no outset","outset"] }
      ];
}
// gilboo.js
function faitPoly(ch){
var i, sr, pts = [];

sr = ch.match(/\[(\-?\d*\.?\d*,\-?\d*\.?\d*)\]/g);
if(sr !== null){
    for(i in sr){
        if( sr[i] !== ''){
            sr[i] = sr[i].replace(/\]/g, "").replace(/\[/g, "");
            pp = sr[i].split(',');
            if(pp.length == 2){
                pts.push([pp[0], pp[1]]);
                //console.log('['+pp[0]+","+pp[1]+']');
            }
        }
    }
}
return pts;
}

function main(params){
var sp, spp, i, ch, sr, j, P, R, Ret;
    sp = params.modele.split(";");
    spp= [];
    for(i in sp){
        ch = sp[i];
        if(ch !== ''){
            sr = ch.match(/\/\*.*?\*\//g);
            if(sr !== null){
                for(j in sr){
                    ch = ch.replace(sr[j], "");
                }
                if (ch !== '')
                spp.push(ch);
            } else
            spp.push(ch);
        }
    }
    P = CAG.fromPoints(faitPoly(spp[0]));

    R = [];
    for(i = 1; i< 1+params.nombre*(params.epaisseur+params.decalage); i+= params.epaisseur+params.decalage){
        R.push(P.scale(i).subtract(P.scale(i-params.epaisseur)));
    }
    R[0]= color("white", linear_extrude({height:1}, R[0]));
	R[1]= color("red", linear_extrude({height:10}, R[1]));
	R[2]= color("blue", linear_extrude({height:1}, R[2]));
    
    //return [R[0],R[1],R[2]];
    Ret = [];
    if(params.inset == 1)Ret.push(R[0]);
    Ret.push(R[1]);
    if(params.outset == 1)Ret.push(R[2]);
    return Ret;
}
