(function(){
  "use strict";

  var burgerOpen=document.getElementById("burger-open");
  var burgerClose=document.getElementById("burger-close");
  var mnav=document.getElementById("mnav");
  function openMenu(){mnav.classList.add("open"); document.body.classList.add("menu-open"); burgerOpen.setAttribute("aria-expanded","true"); burgerOpen.setAttribute("aria-label","Fermer le menu");}
  function closeMenu(){mnav.classList.remove("open"); document.body.classList.remove("menu-open"); burgerOpen.setAttribute("aria-expanded","false"); burgerOpen.setAttribute("aria-label","Ouvrir le menu");}
  burgerOpen && burgerOpen.addEventListener("click", function(){ mnav.classList.contains("open") ? closeMenu() : openMenu(); });
  burgerClose && burgerClose.addEventListener("click", closeMenu);
  mnav && mnav.addEventListener("click", function(e){ if(e.target===mnav) closeMenu(); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && mnav && mnav.classList.contains("open")) closeMenu(); });
  mnav && mnav.querySelectorAll("a").forEach(function(a){a.addEventListener("click", closeMenu);});

  var modal=document.getElementById("quote-modal");
  var quoteButtons=document.querySelectorAll(".svc-quote");
  var quoteClose=document.getElementById("quote-close");
  var svcLabel=document.getElementById("quote-service-label");
  var svcInput=document.getElementById("quote-service-input");
  var lastFocus=null;
  function openModal(service){
    lastFocus=document.activeElement;
    svcLabel.textContent=service;
    svcInput.value=service;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    var f=document.getElementById("q-prenom");
    if(f) f.focus();
  }
  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
  quoteButtons.forEach(function(btn){
    btn.addEventListener("click", function(){ openModal(btn.getAttribute("data-service")||"Intervention"); });
  });
  quoteClose && quoteClose.addEventListener("click", closeModal);
  modal && modal.addEventListener("click", function(e){ if(e.target===modal) closeModal(); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && modal.classList.contains("open")) closeModal(); });

  var CMP_KEY="asb_consent_v1";
  var banner=document.getElementById("cmp-banner");
  function gtagPush(){ window.dataLayer=window.dataLayer||[]; window.dataLayer.push(arguments); }
  function applyConsent(c){
    gtagPush("consent","update",{
      ad_storage:c.ads?"granted":"denied",
      ad_user_data:c.ads?"granted":"denied",
      ad_personalization:c.ads?"granted":"denied",
      analytics_storage:c.analytics?"granted":"denied"
    });
  }
  function getStored(){ try{ return JSON.parse(localStorage.getItem(CMP_KEY)); }catch(e){ return null; } }
  function openBanner(){ banner.classList.add("open"); document.body.classList.add("cmp-active"); }
  function closeBanner(){ banner.classList.remove("open"); document.body.classList.remove("cmp-active"); }
  function saveConsent(c){ try{ localStorage.setItem(CMP_KEY, JSON.stringify(c)); }catch(e){} applyConsent(c); closeBanner(); }
  if(banner){
    var stored=getStored();
    if(stored){ applyConsent(stored); } else { openBanner(); }
    document.getElementById("cmp-accept").addEventListener("click", function(){ saveConsent({analytics:true, ads:true}); });
    document.getElementById("cmp-refuse").addEventListener("click", function(){ saveConsent({analytics:false, ads:false}); });
    var manage=document.getElementById("cmp-manage");
    manage && manage.addEventListener("click", function(e){ e.preventDefault(); openBanner(); });
  }

  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var submitBtn=form.querySelector('button[type="submit"]');
      if(submitBtn) submitBtn.disabled=true;
      var ajaxUrl=form.action.replace("formsubmit.co/","formsubmit.co/ajax/");
      fetch(ajaxUrl,{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded","Accept":"application/json"},
        body:new URLSearchParams(new FormData(form)).toString()
      }).then(function(r){
        if(!r.ok) throw new Error("submit failed");
        form.innerHTML='<p class="fsuccess">Merci, votre demande a bien été envoyée. Vous serez recontacté rapidement. Pour une urgence, appelez le <a href="tel:+33676225240">06 76 22 52 40</a>.</p>';
        if(typeof gtag==="function"){
          gtag('event', 'conversion', {
              'send_to': 'AW-18446338192/SJFBCPuy6_scEJCR89tE',
              'value': 1.0,
              'currency': 'EUR'
          });
        }
      }).catch(function(){
        if(submitBtn) submitBtn.disabled=false;
        alert("Une erreur est survenue lors de l'envoi. Merci d'appeler directement le 06 76 22 52 40.");
      });
    });
  });
})();

(function(){
  var links=document.querySelectorAll('[data-lightbox]');
  if(!links.length || typeof HTMLDialogElement!=='function') return;
  var d=document.createElement('dialog'); d.className='lightbox';
  d.innerHTML='<button type="button" class="lightbox-close" aria-label="Fermer">&times;</button><img alt=""><p></p>';
  document.body.appendChild(d);
  var img=d.querySelector('img'), cap=d.querySelector('p');
  d.querySelector('.lightbox-close').addEventListener('click',function(){d.close();});
  d.addEventListener('click',function(e){ if(e.target===d) d.close(); });
  links.forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); img.src=a.getAttribute('href'); img.alt=a.getAttribute('data-caption')||''; cap.textContent=a.getAttribute('data-caption')||''; d.showModal(); }); });
})();
