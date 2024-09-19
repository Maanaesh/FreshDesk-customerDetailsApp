var client;
const size = 100;

const getHash = async (email) => {
  const finalEmail = email.trim().toLowerCase();
  const hash = CryptoJS.SHA256(finalEmail).toString();
  return hash;
};


const getImgUrl = async (hash) => {
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};


async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderImage);
}

async function renderImage() {
  const avatarElement = document.getElementById('user-avatar');
  const greetingElement = document.getElementById('welcome-txt');
  const contactData = await client.data.get('contact');
  const {
    contact: { email },
    contact:{name},
  } = contactData;

  const hash = await getHash(email); 
  const imgUrl = await getImgUrl(hash); 
  greetingElement.innerText=`Hello, ${name}`
  avatarElement.setAttribute('src', imgUrl);
}

init();
