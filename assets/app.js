'use strict';
(() => {
  const toggle=document.querySelector('[data-menu-toggle]');
  const menu=document.querySelector('[data-menu]');
  const close=()=>{if(!toggle||!menu)return;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');menu.classList.remove('is-open');};
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.classList.toggle('is-open',open);});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    window.addEventListener('resize',()=>{if(window.innerWidth>760)close();});
  }
  const examples={
    leads:{
      area:'CUSTOMER RESPONSE',
      title:'Every qualified inquiry gets an appropriate next step.',
      summary:"Don't let a customer request disappear between inboxes, calendars, and disconnected team tools.",
      result:'The inquiry has an accountable owner and follow-up.',
      stages:[['New request','Recognized & logged'],['Classify need','Context + rules'],['Route response','Authorized handoff'],['Confirm status','Result recorded']]},
    service:{
      area:'SERVICE OPERATIONS',
      title:'Every work order progresses through a visible process.',
      summary:'From the initial job request to assignment, task execution, exception handling, and confirmed completion.',
      result:'The work order has status, evidence, and a recorded closeout.',
      stages:[['Open work order','Request & scope'],['Match resource','Capacity + fit'],['Perform work','Approval as needed'],['Verify closeout','Evidence & receipt']]},
    admin:{
      area:'BACK-OFFICE APPROVAL',
      title:'Internal approvals stop living in scattered conversations.',
      summary:'Coordinate documents and business rules, bring questions to the right people, then record the decision.',
      result:'The approval or exception is recorded with clear ownership.',
      stages:[['Collect request','Files & details'],['Validate inputs','Policies + rules'],['Obtain approval','Human authorization'],['Update status','Auditable record']]}
  };
  const buttons=Array.from(document.querySelectorAll('[data-demo]'));
  const el=id=>document.getElementById(id);
  const select=key=>{
    const d=examples[key];if(!d||!el('demo-title'))return;
    el('demo-area').textContent=d.area;
    el('demo-title').textContent=d.title;
    el('demo-summary').textContent=d.summary;
    el('demo-result').textContent=d.result;
    const host=el('demo-steps');
    host.replaceChildren();
    d.stages.forEach(([name,sub],idx)=>{
      const stage=document.createElement('div');stage.className='demo-step';
      const label=document.createElement('small');label.textContent=String(idx+1).padStart(2,'0')+' / '+['TRIGGER','EVALUATE','ACT','VERIFY'][idx];
      const strong=document.createElement('strong');strong.textContent=name;
      const desc=document.createElement('span');desc.textContent=sub;
      stage.append(label,strong,desc);host.append(stage);
      if(idx<d.stages.length-1){const arrow=document.createElement('div');arrow.className='demo-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';host.append(arrow);}
    });
    buttons.forEach(b=>{const on=b.dataset.demo===key;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});
  };
  buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.demo)));
  document.querySelectorAll('[data-year]').forEach(e=>{e.textContent=String(new Date().getFullYear());});
})();