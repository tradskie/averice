let lobbyData
$.getJSON('../getLobbyData',function(data){lobbyData=data.day_lobbyEntry_usersCount
renderData(lobbyData)
renderChart()});function renderChart(){$(function(e){var options={dataLabels:{enabled:false},legend:{show:false},chart:{height:'260px',type:"line",stacked:false,toolbar:{show:false},dropShadow:{enabled:true,opacity:0.2,},},colors:["#f96a33","#f5c6b830"],stroke:{curve:"smooth",width:[3,3,0],dashArray:[0,4],lineCap:"round"},grid:{padding:{left:10,right:10},strokeDashArray:3},markers:{size:0,hover:{size:0}},series:[{name:"BNB Entry",type:'line',data:[]},{name:"",type:'area',data:[]}],xaxis:{type:"month",categories:[],axisBorder:{show:false,color:'#e7415a',},labels:{style:{colors:'#bababa',fontSize:'12px',},}},yaxis:{labels:{style:{colors:'#bababa',fontSize:'12px',},}},fill:{gradient:{inverseColors:false,shade:'dark',type:"vertical",opacityFrom:0.95,opacityTo:0.55,stops:[0,100,100,100]}},tooltip:{show:false},legend:{position:"top",show:true}}
chartData.forEach(item=>{options.series[0].data.push(item[1])
options.series[1].data.push(item[1])})
for(var i=0;i<=500;i++){options.xaxis.categories.push("Day "+(i+1))}
var chart=new ApexCharts(document.querySelector("#chartArea"),options);chart.render();$('#data-table').DataTable({language:{searchPlaceholder:'Search...',sSearch:'',}});$('.select2').select2({minimumResultsForSearch:Infinity});});}
let chartData
function renderData(data){chartData=data
Object.keys(data).forEach(function(el){data[el][1]=(parseInt(data[el][1])/1e18).toFixed(2)
data[el][2]=parseInt(data[el][2])})}
function arrayMax(arr){return arr.reduce(function(p,v){return Math.max.apply(null,(p>v?p:v));});}