let page = "login";
let inputs = [];
let buttons = [];
let textareas = [];
let svgs = []; 
let mails = [{
      subject: "Hej mail",
      body: "Hej jeg skriver denne mail fordi jeg kan og du skal se den.",
    },
    {
      subject: "test",
      body: "dette er en gammel test mail som jeg har sendt i år 1293123 før jesus.",
    }];
let selectedMail = null;
let mailButtonsCreated = false;

let modal, modalContent, closeModalButton;

function closeModal() {
  modal.style('display', 'none');
}

function setup() {
  createCanvas(800, 500);
  setupPage();
  
  modal = createDiv('');
  modal.position(100, 100);
  modal.size(500, 300);
  modal.style('background-color', '#fff');
  modal.style('border-radius', '16px');
  modal.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
  modal.style('padding', '20px');
  modal.style('display', 'none');  
  modal.style('z-index', '9999');  

  modalContent = createDiv(`
    <ol>
      <li>Der er 3 hovefunktioner i appen. Du kan oprette en ny mail, se tidligere mails og besvarer mails.</li>
      <li>Du kan trykke på tilbage, for at gå tilbage til startmenuen.</li>
      <li>Du kan trykke send for at sende din besked</li>
      <li>Du skal have en overskrift for at kunne sende beskeden</li>
      <li>Du skal også have en modtager af beskeden, her er det vigtigt at du skriver vedkommendes mail-addresse. For eksempel Karlskarn@gmail.com </li>
      <li>Man kan tilføje billeder til beskeden, ved at trykke på vedhæft-ikonet, der er til stede i venstre hjørne, når man skal sende eller svare på beskeder.</li>
    </ol>
  `);
  modalContent.parent(modal);

  closeModalButton = createButton('Luk');
  closeModalButton.parent(modal);
  closeModalButton.mousePressed(closeModal);
  
  closeModalButton.style('background-color', '#000');
  closeModalButton.style('color', 'white');
  closeModalButton.style('border', 'none');
  closeModalButton.style('border-radius', '8px');
  closeModalButton.style('padding', '8px 16px');
}

function createMailButton(mail, x, y, onClick) {
  let btn = createButton('');
  btn.position(x, y);
  btn.class('mail-button');

  let title = createElement('div', mail.subject);
  title.class('mail-title');
  btn.child(title);

  let bodyText = mail.body && typeof mail.body === 'string' ? mail.body.substring(0, 100) + '...' : 'No content available';
  let text = createElement('div', bodyText);

  text.class('mail-text');
  btn.child(text);

  btn.mousePressed(onClick);

  buttons.push(btn);
}

function draw() {
  background(255);

  if (page !== "new_mail") {
    selectedMail = null;
    mailButtonsCreated = false;
  }
  if (page === "login") {
    drawCard();
    drawLoginPage();
  } else if (page === "signup") {
    drawCard();
    drawSignupPage();
  } else if (page === "mail") {
    drawCard();
    drawMailPage();
  } else if (page === "new_mail") {
    drawBigCard();
    drawNewMail();
  } else if (page === "write_mail") {
    drawBigCard();
  } else if (page === "res_mail") {
    drawBigCard();
  }
}

function setupPage() {
  clearUI();
  clearMailButtons();
  if (page === "login") setupLogin();
  if (page === "signup") setupSignup();
  if (page === "mail") setupMail();
  if (page === "new_mail") {
  }
  if (page === "write_mail") {
    setupNewMail();
  }
  if (page === "res_mail") {
    setupResMail();
  }
}

function drawCard() {
  fill(250);
  stroke(220);
  strokeWeight(1);
  rect(100, 100, 500, 300, 16);
}

function drawBigCard() {
  fill(250);
  stroke(220);
  strokeWeight(1);
  rect(25, 25, 700, 450, 16);
}

function clearUI() {
  inputs.forEach(i => i.remove());
  buttons.forEach(b => b.remove());
  textareas.forEach(t => t.remove());
  svgs.forEach(s => s.remove());
  
  inputs = [];
  buttons = [];
  svgs = [];
  textareas = []; 
}

function createCustomInputUI(x, y, w, h, placeholder = "") {
  let input = createInput();
  input.position(x, y);
  input.size(w, h)
  input.attribute('placeholder', placeholder);
  input.style('padding', '6px');
  input.style('border-radius', '8px');
  input.style('border', '1px solid #ddd');
  input.style('font-size', '14px');
  input.style('font-family', 'sans-serif');
  inputs.push(input);
  return input;
}

function createCustomSelectUI(x, y, w, h, options = []) {
  let select = createSelect();
  select.position(x, y);
  select.size(w, h);
  select.style('padding', '6px');
  select.style('border-radius', '8px');
  select.style('border', '1px solid #ddd');
  select.style('font-size', '14px');
  select.style('font-family', 'sans-serif');

  options.forEach(option => {
    select.option(option.subject);
  });

  select.changed(() => {
    console.log("Ny mail valgt til besvarelse: ", select.value());
  });

  inputs.push(select);
  return select;
}

function createInputUI(x, y, placeholder = "") {
  let input = createInput();
  input.position(x, y);
  input.size(300, 30);
  input.attribute('placeholder', placeholder);
  input.style('padding', '6px');
  input.style('border-radius', '8px');
  input.style('border', '1px solid #ddd');
  input.style('font-size', '14px');
  input.style('font-family', 'sans-serif');
  inputs.push(input);
  return input;
}

function createButtonUI(label, x, y, onClick) {
  let btn = createButton(label);
  btn.position(x, y);
  btn.class('btn');
  btn.mousePressed(onClick);
  buttons.push(btn);
}

function createTextareaUI(x, y, w, h, placeholder = "") {
  let area = createElement('textarea');
  area.position(x, y);
  area.size(w, h);
  area.attribute('placeholder', placeholder);
  area.style('resize', 'none');
  area.class('textarea');
  textareas.push(area);

  let svg = createDiv('');
  svg.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/></svg>');
  svg.position(60, y + h - 20);
  svg.size(20, 20); 

  svgs.push(svg); 

  return area;
}

function drawTextLabel(txt, x, y, size = 14, color = 100) {
  noStroke();
  fill(color);
  textAlign(LEFT, TOP);
  textSize(size);
  text(txt, x, y);
}

function setupResMail() {
  createCustomSelectUI(40, 40, 687, 40, mails); 
  createCustomInputUI(40, 85, 673, 25, "Andre der skal se beskeden:"); 

  createTextareaUI(40, 130, 668, 290, "Din mail her.");

  createButtonUI("Tilbage", 40, 445, () => {
    page = "mail"; 
    setupPage();
  });

  createButtonUI("Send", 660, 445, () => {
    alert("Email er sendt!!");
    page = "mail";  
    setupPage();
  });
}

function setupNewMail() {
  createCustomInputUI(40, 40, 673, 25, "Modtager:"); 
  createCustomInputUI(40, 85, 673, 25, "CC:"); 
  createCustomInputUI(40, 130, 673, 25, "Emne:"); 

  createTextareaUI(40, 175, 668, 245, "Din mail her.");

  createButtonUI("Tilbage", 40, 445, () => {
    page = "mail"; 
    setupPage();
  });

  createButtonUI("Send", 660, 445, () => {
    alert("Email er sendt!!");
    page = "mail";  
    setupPage();
  });
}

function setupLogin() {
  createInputUI(195, 205, "Email");
  createInputUI(195, 280, "Kodeord");

  createButtonUI("Login", 520, 370, () => {
    if (validateLogin()) {
      page = "mail";
      setupPage();
    }
  });

  createButtonUI("Klik her!", 350, 330, () => {
    page = "signup";
    setupPage();
  });
}

function drawSelectedMailBox(mail) {
  fill(240);
  stroke(220);
  strokeWeight(1);
  rect(350, 33, 365, 430, 8);

  fill(0);
  textAlign(LEFT, TOP);
  textSize(16);
  text(mail.subject, 360, 50);
  textSize(14);

  textSize(14);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  text(mail.body, 360, 80, 355);
}

function drawNewMail() {
  if (!mailButtonsCreated) {
    mails.forEach((mail, index) => {
      createMailButton(mail, 40, 40 + index * 110, () => openMail(index));
    });
    mailButtonsCreated = true; 
  }
  
  if (selectedMail !== null) {
    drawSelectedMailBox(mails[selectedMail]);
  }
  
  createButtonUI("Tilbage!", 45, 440, () => {
    page = "mail";
    setupPage();
  });
}

function clearMailButtons() {
  mailButtonsCreated = false;
}

function drawLoginPage() {
  drawTextLabel("Her kan du logge ind, eller oprette en konto", 225, 130, 14, 120);
  drawTextLabel("Email:", 190, 180);
  drawTextLabel("Kodeord:", 190, 255);
  drawTextLabel("Har du ikke en konto?", 190, 330);
}

function setupSignup() {
  createInputUI(195, 155, "Email");
  createInputUI(195, 230, "Kodeord");
  createInputUI(195, 300, "Bekræft kodeord");

  createButtonUI("Opret", 520, 370, () => {
    if (validateSignup()) {
      page = "mail";
      setupPage();
    }
  });

  createButtonUI("Tilbage", 115, 370, () => {
    page = "login";
    setupPage();
  });
}

function drawSignupPage() {
  drawTextLabel("Her kan oprette en konto", 250, 110, 14, 120);
  drawTextLabel("Email:", 190, 130);
  drawTextLabel("Kodeord:", 190, 205);
  drawTextLabel("Bekræft kodeord:", 190, 275);
}

function setupMail() {
  createButtonUI("Ny mail", 190, 230, () => {
    clearUI();
    page = "write_mail"; 
    setupPage();
  });
  
  createButtonUI("?", 120, 370, () => {
    modal.style('display', 'block');
  });
  
  createButtonUI("Log ud", 520, 370, () => {
    clearUI();
    page = "login"; 
    setupPage();
  });
  
  
  createButtonUI("Se Mail", 320, 230, () => {
    clearUI();
    page = "new_mail"; 
    setupPage();
  });

  createButtonUI("Svar Mail", 450, 230, () => {
    clearUI();
    page = "res_mail"; 
    setupPage();
  });
}

function drawMailPage() {
  drawTextLabel("Mails", 300, 50, 24);

  if (selectedMail !== null) {
    drawTextLabel("Subject: " + mails[selectedMail].subject, 50, 100);
    drawTextLabel("Body: " + mails[selectedMail].body, 50, 130);
  }
}

function validateLogin() {
  let email = inputs[0].value();
  let password = inputs[1].value();

  if (!email || !password) {
    alert("Udfyld venligt begge inputs!");
    return false;
  }
  return true;
}

function validateSignup() {
  let email = inputs[0].value();
  let password = inputs[1].value();
  let confirmPassword = inputs[2].value();

  if (!email || !password || !confirmPassword) {
    alert("Udfyld venligst alle felter!");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords matcher ikke");
    return false;
  }

  return true;
}

function openMail(index) {
  selectedMail = index;
  setupPage();
}
