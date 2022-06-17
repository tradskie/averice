let currentTargetStakeId,collectLend_targetStakeId
function userAccConnected(){return
getMyStakes()
getMyLends()
getSellRequests()
mainContract.methods.LoanedFunds(user.address).call({shouldPollResponse:true}).then(res=>{$('.tmn-12')[0].innerHTML=`You have - ${parseInt(res)/1e18} BNB - loaned! click to collect.`})}
function refreshMyStakes(){$('.stake-ls')[0].innerHTML=""
getMyStakes()}
function getMyStakes(){mainContract.methods.calcStakeCount(user.address).call({shouldPollResponse:true}).then(res=>{if(parseInt(res)>0){getMyStakes_det(parseInt(res))
$('.loading-tx-1')[0].remove()}else if(parseInt(res)==0){$('.loading-tx-1')[0].innerHTML="You have no stakes!"}})}
function getMyLends(){mainContract.methods.clcLenderStakeId(user.address).call({shouldPollResponse:true}).then(res=>{if(parseInt(res)>0){getMyLends_det(parseInt(res))
$('.loading-tx-2')[0].remove()}else if(parseInt(res)==0){$('.loading-tx-2')[0].innerHTML="You have no lends!"}})}
function getMyStakes_det(count){let curentId=0
let triedIdLast=0
getOneStake(curentId)
function getOneStake(id){mainContract.methods.mapMemberStake(user.address,id).call({shouldPollResponse:true}).then(res=>{if(res.stake_hasSold==false)renderAStake(res,id)
triedIdLast++
if(triedIdLast<count)getOneStake(triedIdLast)})}}
function getMyLends_det(count){let curentId=0
let triedIdLast=0
getOneLend(curentId)
function getOneLend(id){mainContract.methods.mapLenderInfo(user.address,id).call({shouldPollResponse:true}).then(res=>{renderALend(res,id)
triedIdLast++
if(triedIdLast<count)getOneLend(triedIdLast)})}}
function renderAStake(stake,id){stake.startDay=parseInt(stake.startDay)
stake.endDay=parseInt(stake.endDay)
stake.tokenValue=parseInt(stake.tokenValue)
let isforSell=false
if(stake.stake_forSell)isforSell=true
let stake_id=stake.stakeId
let actBtn=actionButton_sell
if(stake.stake_forLoan){if(stake.price.length<25)actBtn=actionButton_sell_alreadyforsell+actionButton_sell_alreadyforsell_cancel}else if(stake.stake_hasLoan){actBtn=actionButton_has_loan}
if(parseInt(stake.startDay)>currentDay){actBtn=actionButton_notyet}
let progress,bonusTokens="--"
if(stake.startDay-1==currentDay){progress="starting soon"}else if(stake.endDay>currentDay){progress=parseInt(Math.abs((((stake.endDay-currentDay)/(stake.endDay-stake.startDay))*100)-100))+"%"
if(progress==="100%")progress="99%"
bonusTokens=(calcBonusToken(stake.endDay-stake.startDay,stake.tokenValue/1e18)).toFixed(5)}else{progress="completed"}
let bgRow=""
if((id%2)==1){bgRow="background: #f7f7f7bf"}else{bgRow=""}
if(progress!=="completed"){$('.stake-ls')[0].innerHTML=`<tr role="row" class="" style="${bgRow}">
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div data-v-254b7dbb="" class="font-small-2 text-muted">${stake.startDay}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb=""  class="d-flex align-items-center">
                    <div data-v-254b7dbb="" id="${stake_id}a" class="font-small-2 text-muted">${stake.endDay}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-3-${id}" data-v-254b7dbb="" class="font-small-2 text-muted" style="font-weight:900; color: #24d8a4;">${progress}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-4-${id}" data-v-254b7dbb="" class="font-small-2 text-muted">${(stake.tokenValue/1e18).toFixed(0)}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb=""  class="d-flex align-items-center">
                    <div class="ltv-5-${id}" id="${stake_id}b"data-v-254b7dbb="" class="font-small-2 text-muted">--</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltv-6-${id}" data-v-254b7dbb="" class="font-small-2 text-muted">${bonusTokens}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" id="${stake_id}" class="ltv-7-${id}" style="width: 26%; height: 0px;  padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            ${actBtn}
            </td>
        </tr>`+$('.stake-ls')[0].innerHTML
getStakeDivs(id)
function getStakeDivs(id){mainContract.methods.calcStakeCollecting(user.address,id).call({shouldPollResponse:true}).then(res=>{$(`.ltv-5-${id}`)[0].innerHTML=(parseInt(res)/1e18).toFixed(5)
if(parseFloat((parseInt(res)/1e18).toFixed(5))<0.01){$(`.ltv-7-${id}`)[0].innerHTML=actionButton_notyet_balance}})}}}
function renderALend(lend){lend.endDay=parseInt(lend.endDay)
lend.loanAmount=parseInt(lend.loanAmount)
lend.returnAmount=parseInt(lend.returnAmount)
let LenderStakeId=lend.stakeId
let actBtn=actionButton_loanCollect_notReached
let progress=((lend.endDay-currentDay))+" Day/s left"
if((lend.endDay-currentDay)<=0){progress="Ready to collect"
actBtn=actionButton_loanCollect
if(lend.loanIsPaid){progress="Collected"
actBtn=actionButton_loanCollect_ed}}
let bgRow=""
if((LenderStakeId%2)==1){bgRow="background: #f7f7f7bf"}else{bgRow=""}
if(progress!=="completed"){$('.loan-ls')[0].innerHTML=`<tr role="row" class="" style="${bgRow}">
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb=""  class="d-flex align-items-center">
                    <div data-v-254b7dbb="" class="font-small-2 text-muted">${lend.endDay}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltl-3-${LenderStakeId}" data-v-254b7dbb="" class="font-small-2 text-muted" style="font-weight:900; color: #24d8a4;">${progress}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb="" class="d-flex align-items-center">
                    <div class="ltl-4-${LenderStakeId}" data-v-254b7dbb="" class="font-small-2 text-muted">${(lend.loanAmount/1e18).toFixed(3)}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" class="" style="    padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
                <div data-v-254b7dbb=""  class="d-flex align-items-center">
                    <div class="ltl-5-${LenderStakeId}" data-v-254b7dbb="" class="font-small-2 text-muted">${(lend.returnAmount/1e18).toFixed(3)}</div>
                </div>
            </td>
            <td aria-colindex="1" role="cell" id="${LenderStakeId}" class="${lend.loanerAddress}" style="width: 26%; height: 0px;  padding: 8px 0px;border-top: 1px solid #ebe9f1; vertical-align: middle;">
            ${actBtn}
            </td>
        </tr>`+$('.loan-ls')[0].innerHTML}}
let lenderStakeId_s
function collectLend(lenderStakeId,loanerAddress){lenderStakeId_s=lenderStakeId
findLoanerId(loanerAddress)
$('.tt-cl')[0].innerHTML="..."}
function collectLend_final(stakeId,lenderStakeId){mainContract.methods.collectLendReturn(lenderStakeId,stakeId).send({from:user.address,shouldPollResponse:true}).then(res=>{doAlert(`Successfully collected.`,3)
refreshClick(3)}).catch(err=>{doAlert("Something went wrong!",2)
console.log(err)})}
function findLoanerId(loanerAddress){mainContract.methods.calcStakeCount(loanerAddress).call({shouldPollResponse:true}).then(res=>{findLoanerId_B(parseInt(res),loanerAddress)})}
function findLoanerId_B(loaners_stake_counts,loanerAddress){let curentId=0
let triedIdLast=0
getOneRequestingLoan(curentId)
function getOneRequestingLoan(id){mainContract.methods.mapRequestingLoans(loanerAddress,id).call({shouldPollResponse:true}).then(res=>{if((res.lenderAddress).toLocaleUpperCase()==(user.address).toLocaleUpperCase()){collectLend_final(res.stakeId,lenderStakeId_s)}else{triedIdLast++
if(triedIdLast<loaners_stake_counts)getOneRequestingLoan(triedIdLast)}})}}
const actionButton_notyet_balance=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #baedd3 0%, #74b1ac 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: 1px 2px 5px #78cbad8f">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted">Not enough divs</div>
</div>`
const actionButton_notyet=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #baedd3 0%, #74b1ac 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: 1px 2px 5px #78cbad8f">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted">Not ready for loan</div>
</div>`
const actionButton_has_loan=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #baedd3 0%, #74b1ac 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: 1px 2px 5px #78cbad8f">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted">Currently Loaned</div>
</div>`
const actionButton_loanCollect_ed=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #baedd3 0%, #74b1ac 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: 1px 2px 5px #78cbad8f">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted">Collected</div>
</div>`
const actionButton_loanCollect_notReached=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #baedd3 0%, #74b1ac 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;box-shadow: 1px 2px 5px #78cbad8f">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted">Not reached</div>
</div>`
const actionButton_loanCollect=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #3ade8b 0%, #0bb8ae 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted tt-cl" onclick="collectLend(this.parentNode.parentNode.id, this.parentNode.parentNode.className)">Collect</div>
</div>`
const actionButton_sell=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #3ade8b 0%, #0bb8ae 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="getLoan_pre(this.parentNode.parentNode.id)">Get loan</div>
</div>`
const actionButton_sell_alreadyforsell=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="background: linear-gradient(to bottom right, #afdc39 0%, #51ba75 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="getLoan_pre(this.parentNode.parentNode.id)">Update loan request</div>
</div>`
const actionButton_sell_alreadyforsell_cancel=`<div data-v-254b7dbb="" class="d-flex align-items-center" style="margin-top: 4px; background: linear-gradient(to bottom right, #afdc39 0%, #51ba75 100%) !important; border-radius: 25px;color: #ffffffc9;font-weight: 900;font-size: 15px;padding: 0;cursor: pointer;box-shadow: 1px 2px 5px #2cd2968f;">
<div data-v-254b7dbb="" class="mt-no font-small-2 text-muted" onclick="cancelLoanOffer(this.parentNode.parentNode.id)">Cancel loan request</div>
</div>`
function getLoan_pre(id){$(`.inp-er-2`)[0].placeholder=(parseInt($(`#${id}a`)[0].innerHTML)-currentDay)+" Days (max)"
$(`.inp-er-1`)[0].placeholder=(parseFloat($(`#${id}b`)[0].innerHTML)-0.001).toFixed(3)+" BNB (min)"
$(`.inp-er-3`)[0].placeholder=(parseFloat($(`#${id}b`)[0].innerHTML)-0.001).toFixed(3)+" BNB (max)"
openModal(id)}
function loanRequestFinal(){let data_amount=parseFloat($('.inp-er-1')[0].value)*1000000
let data_days=parseInt($('.inp-er-2')[0].value)
let data_return=parseFloat($('.inp-er-3')[0].value)*1000000
if(!data_amount||!data_days||!data_return)return
$('.mt-no')[0].innerHTML="..."
mainContract.methods.getLoanOnStake(currentTargetStakeId,(BigInt(data_amount)*BigInt(1e18))/BigInt(1000000),(BigInt(data_return)*BigInt(1e18))/BigInt(1000000),data_days).send({from:user.address,shouldPollResponse:true}).then(res=>{console.log(res)
doAlert(`Successfully created loan request.`,3)
closeModal()
$('.mt-no')[0].innerHTML="Get loan"}).catch(err=>{doAlert("Something went wrong!",2)
closeModal()
console.log(err)}).finally(res=>{closeModal()
$('.mt-no')[0].innerHTML="Get loan"})}
function cancelLoanOffer(id){mainContract.methods.cancelStakeLoanRequest(id).send({from:user.address,shouldPollResponse:true}).then(res=>{doAlert(`Successfully cancelled loan request.`,3)
refreshClick
refreshClick(2)}).catch(err=>{doAlert("Something went wrong!",2)
console.log(err)})}
function openModal(stakeId){currentTargetStakeId=stakeId
$('.modal')[0].style.marginTop="auto"
$('.modal')[0].style.marginLeft="auto"
$('.modal')[0].style.visibility="visible"
$('.modal')[0].style.opacity="1"}
function closeModal(){$('.modal')[0].style.marginTop="-10000px"
$('.modal')[0].style.marginLeft="-10000px"
$('.modal')[0].style.visibility="invisible"
$('.modal')[0].style.opacity="0"}
function openModal2(){$('.modal2')[0].style.marginTop="auto"
$('.modal2')[0].style.marginLeft="auto"
$('.modal2')[0].style.visibility="visible"
$('.modal2')[0].style.opacity="1"}
function closeModal2(){$('.modal2')[0].style.marginTop="-10000px"
$('.modal2')[0].style.marginLeft="-10000px"
$('.modal2')[0].style.visibility="invisible"
$('.modal2')[0].style.opacity="0"}
$('.pg_tt_swap')[0].style.color="white"
function getSellRequests(){if(!moralisRecentEvents||!moralisRecentEvents[4]){setTimeout(()=>{getSellRequests()},500)}else{beforeRender_checkTimeStamp(moralisRecentEvents[4])}}
function beforeRender_checkTimeStamp(data){let expireAtDayCount=10*(24*60*60)
let newData=[]
fetchedStakes=[]
data.forEach(el=>{el=el
newData.push(el)})
beforeRender_getFullStake(newData)}
function beforeRender_getFullStake(data){data.forEach(el=>{getStake(el.addr,el.stakeId,el.timestamp)})}
let stakesToBeRendered=[]
let fetchedStakes=[]
function getStake(address,stakeId,timestamp){stakesToBeRendered=[]
let alreadyProccesesOffer=false
fetchedStakes.forEach(itm=>{if(itm[0]==address&&itm[1]==stakeId)alreadyProccesesOffer=true})
if(alreadyProccesesOffer==false){mainContract.methods.mapMemberStake(address,stakeId).call({shouldPollResponse:true}).then(res0=>{if(res0.stake_forLoan){mainContract.methods.mapRequestingLoans(address,stakeId).call({shouldPollResponse:true}).then(res=>{res.timestamp=timestamp
stakesToBeRendered.push(res)
runRenderIn()})}})
fetchedStakes.push([address,stakeId])}}
let timOut
function runRenderIn(){clearTimeout(timOut)
timOut=setTimeout(()=>{renderForSales()},1000*1)}
function renderForSales(){doSort(1,stakesToBeRendered)
let ide=0
$('.grid-container-fs')[0].innerHTML=""
stakesToBeRendered.forEach(itm=>{ide++
if(itm){let returnAmount=parseFloat(itm.returnAmount)/1e18
let loanAmount=parseFloat(itm.loanAmount)/1e18
let duration=parseInt(itm.duration)
$('.cd-t-se')[0].innerHTML="Loan Requests ("+(parseInt($('.grid-container-fs')[0].children.length)+1)+")"
let interest=((returnAmount-loanAmount)*100/loanAmount).toFixed(2)
let progress=interest
$('.grid-container-fs')[0].innerHTML+=`
            <div class="itm" style="
            display: inline-block;
            width: 200px;
            height: 130px;
            background: #2d303e;
            border-radius: 8px;
            margin: 10px;
            box-shadow: 0 1px 6px #0000005e;
        "><div style="
            padding-top: 6px;
        "><p  class="v-i-1" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            width: 100%;
            padding-left: 0px;
            font-weight: 500;
        ">Return interest: ${interest}%</p><div style="
                        background-color: #c8c8c82b;
                        height: 8px;
                        margin-left: 15px;
                        margin-right: 15px;
                        border-radius: 50px;
                        margin-top: 20px;
                    "><div  class="v-i-3"style="
                    background-image:linear-gradient(45deg, #dd4649 0%, #9c27b0 100%);
                    height: 8px;
                    border-radius: 50px;
                    width: ${progress}%;
                    box-shadow: 0 0px 6px #b02787
                    "></div></div></div><div style="
            padding-top: 10px;
        "><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">Amount:</span><span class="v-i-4" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">${loanAmount.toFixed(3)} BNB</span><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">Return:</span><span  class="v-i-5" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
            padding-right: 20px;
        ">${returnAmount.toFixed(3)} BNB</span><span style="
            color: #ffffffb0;
            display: inline-block;
            float: left;
            padding-left: 4px;
            width: 27%;
        ">Days:</span><span class="v-i-6" style="
            color: #b6e7e7ab;
            display: inline-block;
            float: left;
            padding-left: 10px;
        ">${duration} Days</span><div class="v-i-77-${ide} v-i-7" onclick="lendAStake('${itm.loanerAddress}', ${itm.stakeId}, ${itm.loanAmount})" style="
            background: linear-gradient(to bottom right, #f3dc57 0%, #fd991a 100%) !important;
            /* border-radius: 25px; */
            color: #ffffffc9;
            font-weight: 900;
            font-size: 15px;
            padding: 0;
            cursor: pointer;
            /* box-shadow: 1px 2px 5px #fba322a6; */
            bottom: 0px;
            position: relative;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            height: 20px;
            text-align: center;
            width: inherit;
            /* display: none; */
            margin-top: 66px;
        ">Lend ${loanAmount.toFixed(3)} BNB</div></div></div>
        `
if((itm.loanerAddress).toLocaleUpperCase()===(user.address).toLocaleUpperCase()){$(`.v-i-77-${ide}`)[0].innerHTML=`Loaning ${(parseInt(itm.loanAmount)/1e18).toFixed(3)} BNB`
$(`.v-i-77-${ide}`)[0].style.background="linear-gradient(to bottom right, #cddc39 0%, #4caf50 100%)"}}})}
function calcBonusToken(StakeDuration,tokenValue){return(tokenValue*((StakeDuration**2)*128)/1e7)}
function refreshClick(val){if(val==1){$('.stake-ls')[0].innerHTML=""
getMyStakes()}else if(val==2){$('.grid-container-fs')[0].innerHTML=""
getSellRequests()}else{}}
function lendAStake(loanerAddress,stakeId,loanAmount){if((loanerAddress).toLocaleUpperCase()===(user.address).toLocaleUpperCase())return
mainContract.methods.lendOnStake(loanerAddress,stakeId).send({from:user.address,shouldPollResponse:true,value:parseInt(loanAmount)}).then(res=>{console.log(res)
doAlert(`Successfully Lent ${(parseInt(loanAmount)/1e18).toFixed(3)} BNB.`,3)
refreshClick(1)
refreshClick(2)
refreshClick(3)}).catch(err=>{doAlert("Something went wrong!",2)
console.log(err)})}
function collectStakeSoldReward(){mainContract.methods.withdrawLoanedFunds().send({from:user.address,shouldPollResponse:true}).then(res=>{doAlert(`Successfully Collected!`,3)}).catch(err=>{doAlert("Something went wrong!",2)
console.log(err)})}
function refreshGlobalData(){mainContract.methods.totalLoanedAmount().call({shouldPollResponse:true,}).then(res=>{$('.gd-31')[0].innerHTML=(parseInt(res)/1e18).toFixed(2)})
mainContract.methods.totalLoanedCount().call({shouldPollResponse:true,}).then(res=>{$('.gd-32')[0].innerHTML=parseInt(res)})
mainContract.methods.LoanedFunds(user.address).call({shouldPollResponse:true,}).then(res=>{$('.user-data-3')[0].value=(parseInt(res)/1e18).toFixed(3)})
mainContract.methods.referrerBonusesPaid(user.address).call({shouldPollResponse:true,}).then(res=>{$('.user-data-5')[0].value=(parseInt(res)/1e18).toFixed(4)})}
let incomingSortType=1
function sortOffers(sortby){incomingSortType=sortby
refreshClick(2)}
function doSort(noused,data){if(incomingSortType==1){data.sort((b,a)=>parseInt(a.timestamp)-parseInt(b.timestamp));}
else if(incomingSortType==2){data.sort((b,a)=>parseInt(a.price)-parseInt(b.price));}
else if(incomingSortType==3){data.sort((b,a)=>parseInt(a.tokenValue)-parseInt(b.tokenValue));}
else if(incomingSortType==4){data.sort((b,a)=>parseInt(a.endDay)-parseInt(b.endDay));}}