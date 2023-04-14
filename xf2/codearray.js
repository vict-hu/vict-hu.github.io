// Work
work_array = [
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/328106931?h=df95fc8e93&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><div class="title">夕卜&nbsp;&nbsp;</div><p><br>A film by Xiaofei Mo & POND, 2019<br><br>A study on foreignness. Following the 1858 Treaty of Tientsin which granted foreigners the right to travel in China, Russian orientalist Alekseĭ Matveevich Pozdneev led a year-long expedition to China and Mongolia. Pozdneev arrived at a moment when the notion of foreignness was intensely debated. Many of the places he visited exist in my childhood memory only as names. But names are never just names. For instance, <em>Zhangjiakou</em>, also known as <em>Kalgan</em> in Mongolian, summons in both languages the idea of &#39;gate&#39; &mdash; a symbol of border and protection, a separation, a threshold. But doors open upon the mysterious &mdash; doesn’t it also project the scene of passing, an invitaion to cross from one world to another?<br><br>In 2018 I traveled along Pozdneev&#39;s route with POND, an AI trained on translations and capable of annotating images. Our hope is not to pledge allegiance to one history or another, but to develop a way of seeing that can only be understood as foreign and alien.</p>',

  '<img src="./images/work1.jpg"><div class="title">夕卜&nbsp;&nbsp;</div><p><br>Installation view at c4 projects, Copenhagen, 2019<br><br><a href="http://www.c4projects.dk/responding/">link</a></p>',

  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/481448579?h=93b0e6d624&amp&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><div class="title">Lovers Revolt Lovers Revolve 1</div><p><br>A film by Xiaofei Mo & POND, 2020<br><br>Lovers Revolt Lovers Revolve is a collaborative fiction project by Xiaofei Mo and Cici Wu, consisting of videos, works on paper, and an on-going series of publications. Deploying the literary framework of a fated romance existing across time and space, Mo and Wu populate their magical realist narrative with a cast of eclectic characters including: a lantern from Khotan, a thousand-year old immortal girl, a lighthouse, a disappeared island, the ghost of cinema, a missing tooth, and a sentient mirror. Speculating upon the past lives and future lives of the city of Hong Kong, LRLR weaves a kind of political fable connecting both recent and distant socio-political memories, in an attempt to intervene in the way we envision our own history and establish the grounds for a new imaginary of resistance. The artists want to suggest another set of language to uncover the invisible world, to restore a different past and manifest a future towards liberation, in the process posing the essential question — what is the relationship between love and revolution? They try to break a system of dualities through the language they remembered as they were little and innocent.</p>',

  '<img src="./images/work2.jpg"><div class="title">Lovers Revolt Lovers Revolve 1</div><p><br>Installation view at Empty Gallery, Hong Kong Spotlight by Art Basel, 2020<br><br><a href="https://emptygallery.com/fairs/hong-kong-spotlight-by-art-basel-2020/">link</a></p>',

  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/799674183?h=f69d90bdd2&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><div class="title">Lovers Revolt Lovers Revolve 2</div><p><br>A film by Xiaofei Mo & POND, 2023<br><br>Lovers Revolt Lovers Revolve is a collaborative fiction project by Xiaofei Mo and Cici Wu, consisting of videos, works on paper, and an on-going series of publications. Deploying the literary framework of a fated romance existing across time and space, Mo and Wu populate their magical realist narrative with a cast of eclectic characters including: a lantern from Khotan, a thousand-year old immortal girl, a lighthouse, a disappeared island, the ghost of cinema, a missing tooth, and a sentient mirror. Speculating upon the past lives and future lives of the city of Hong Kong, LRLR weaves a kind of political fable connecting both recent and distant socio-political memories, in an attempt to intervene in the way we envision our own history and establish the grounds for a new imaginary of resistance. The artists want to suggest another set of language to uncover the invisible world, to restore a different past and manifest a future towards liberation, in the process posing the essential question — what is the relationship between love and revolution? They try to break a system of dualities through the language they remembered as they were little and innocent.</p>',

  '<img src="./images/work3.jpg"><div class="title">Lovers Revolt Lovers Revolve 2</div><p><br>Installation view at Hordaland kunstsenter, Bergen, 2023<br><br><a href="https://www.kunstsenter.no/#/program/553">link</a></p>',

  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/812990780?h=32d5b2b0d9&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><div class="title">Willow</div><p><br>Work in progress</p>',

  '<img src="./images/work4.jpg"><div class="title">Willow</div><p><br>Work in progress</p>',

  '<img src="./images/work5.jpg"><div class="title">Willow</div><p><br>Work in progress</p>',
]

function get_random_work(){
  // Get a random index
  random_index = Math.floor(Math.random() * work_array.length);

  // Get code using the random_index
  selected_code = work_array[random_index]

  // Insert the code
  document.getElementById('wrapper').innerHTML = `${selected_code}`
}

// Collaborations
collaborations_array = [
  '<img src="./images/collaborations1-1.jpg"><div class="title">A Seed</div><p class="paragraph"><br>Collective action<br>Public spaces, New York, July 2017<br><br>Mourning and bereavement for a recent death Liu Xiaobo (1955&ndash;2017), with the hope that Liu Xiaobo who had high hopes but took a risky path during his time and suffered for that will be remembered. We organized a seeding memorial in the Socrates Sculpture Park; and placed placards containing Liu Xiaobo&#39;s words around Chinatown in New York.</p>',

  '<img src="./images/collaborations1-2.jpg"><div class="title">A Seed</div><p class="paragraph"><br>Collective action<br>Public spaces, New York, July 2017<br><br>Mourning and bereavement for a recent death Liu Xiaobo (1955&ndash;2017), with the hope that Liu Xiaobo who had high hopes but took a risky path during his time and suffered for that will be remembered. We organized a seeding memorial in the Socrates Sculpture Park; and placed placards containing Liu Xiaobo&#39;s words around Chinatown in New York.</p>',

  '<img src="./images/collaborations3-1.jpg" style="width:30% !important; margin-top:10%; margin-bottom:10%; margin-left:40%;"><div class="title">The Room of Spirit and Time</div><p class="paragraph"><br>Founding members of TRST from left to right: Taro Masushio, Ali Van, Cici Wu, Xiaofei Mo, Wang Xu, photo taken on April 28th, 2019, New York<br><br>The Room of Spirit and Time is initiated by Taro Masushio, Xiaofei Mo, Ali Van, Wang Xu and Cici Wu. Taking the form of collaborative works and events, the first iteration at Queens Museum begins with readings of ancient and medieval Asian texts as a possible means to reimagine and cultivate a romantic epistemology. In this room, both learning and unlearning take place; we invite temporary amnesia, a kind of forgetting and drifting via exercises, recitations, meditations, improvisations... fluid and ephemeral sleepwalking. Along these activities are non-activities, where TRST functions as a hub for leisurely gatherings, for artists and thinkers, dreams and realities, set to a slow flow against the fast rhythms of New York City.<br><br><a href="http://theroomofspiritandtime.info/">link</a></p>',

  '<img src="./images/collaborations3-2.jpg" style="width:40% !important; margin-top:10%; margin-bottom:10%; margin-left:20%;"><div class="title">The Room of Spirit and Time<br>at Catskill Zendo</div><p class="paragraph"><br>Night reading of The Book of Mountains and Seas, organized by Ontopo, August 2019<br><br><a href="https://www.ontopo.net/project/the-classic-of-mountains-and-seas">link</a></p>',

  '<img src="./images/collaborations3-3.jpg" style="width:30% !important; margin-top:10%; margin-bottom:10%; margin-left:0%;"><img src="./images/collaborations3-5.jpg" style="width:20% !important; margin-top:30%; margin-bottom:0%; margin-left:10%;"><div class="title">The Room of Spirit and Time<br>Body So Low</div><p class="paragraph"><br>Drawings by visitors, first reading session, February 2019<br><br>The process of mourning, for the passing of spirit and time. The blood line keeps merging, flowing, sinking. Breath propelled into motion out of space. All the deaths before us, what flight are you taking?<br><br>TRST invites you to join our first reading session, Body So Low. The text chosen is Traditions of Divine Transcendents, a collection of biographies, or eulogies, attributed to Ge Hong from the 3rd-4th century China, about ordinary human beings on the quest for radical departure. In other words, "They shed their mortal forms and melted away."<br><br>As an obscure and unfamiliar text, Traditions of Divine Transcendents was compiled in the beginning of the formation of Taoism. These practitioners demonstrated the use of matter and process as supposed means of achieving what cannot be simply understood as the obviation of death, but rather to attain an exalted state of existence through assimilating to and connecting with distant realms.The attainment assumed a process of inner studies and enhanced awareness of reality.<br><br>We hope this somehow opaque text could bring thoughts towards imagining questions such as how to act radically; overcoming fear; afterlife of institutions; matter and spirit in consumerism; friendship and kinship in different spaces and temporalities; and together we collect inspirations from the text and celebrate. We are not searching for any solutions in this journey of reading.<br><br><a href="./images/links_BodySoLow_01312019.pdf">PDF</a></p>',

  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/812996554?h=9055eac858&amp&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><div class="title">The Room of Spirit and Time<br>Cloud Vapor Star</div><p class="paragraph"><br>Suspended in a pandemic, a collective longing across time zones, July 2020<br><br><a href="https://youtu.be/QpJZEfd_wJ8">link</a></p>',

    '<img src="./images/collaborations4.jpg"><div class="title">Lovers Revolt Lovers Revolve: Stories against dictators, colonizers, and all other monsters</div><p><br>Serial 1, 2020<br>Written by Xiaofei Mo & Cici Wu, published by Empty Gallery HK, edition of 100<br><br>Lovers Revolt Lovers Revolve is a collaborative fiction project by Xiaofei Mo and Cici Wu, consisting of videos, works on paper, and an on-going series of publications. Deploying the literary framework of a fated romance existing across time and space, Mo and Wu populate their magical realist narrative with a cast of eclectic characters including: a lantern from Khotan, a thousand-year old immortal girl, a lighthouse, a disappeared island, the ghost of cinema, a missing tooth, and a sentient mirror. Speculating upon the past lives and future lives of the city of Hong Kong, LRLR weaves a kind of political fable connecting both recent and distant socio-political memories, in an attempt to intervene in the way we envision our own history and establish the grounds for a new imaginary of resistance. The artists want to suggest another set of language to uncover the invisible world, to restore a different past and manifest a future towards liberation, in the process posing the essential question — what is the relationship between love and revolution? They try to break a system of dualities through the language they remembered as they were little and innocent.<br><br><a href="./images/links_LoversRevolt LoversRevolve_1_reversed.pdf">PDF</a></p>',

]

function get_random_collaboration(){
  // Get a random index
  random_index = Math.floor(Math.random() * collaborations_array.length);

  // Get code using the random_index
  selected_code = collaborations_array[random_index]

  // Insert the code
  document.getElementById('wrapper').innerHTML = `${selected_code}`
}

// Memories
memories_array = [
  '<img src="./images/memories2.jpg"><p style="margin-bottom:100px;">A view from home, 2017</p>',
  '<video autoplay loop muted playsinline style="width:100%;"><source src="./images/memories3.mp4" type="video/mp4" /></video><p style="margin-bottom:100px;">Pages from a sutra, 1999</div>',
  '<img src="./images/memories5.jpg"><p style="margin-bottom:100px;">Logic class, photo from a classmate, 2007</p>',
  '<video autoplay loop muted playsinline style="width:100%;"><source src="./images/memories7.mp4" type="video/mp4" /></video><p style="margin-bottom:100px;">Charlie vs Charlie with friends, 2023</div>',
  '<img src="./images/memories8.jpg"><p style="margin-bottom:100px;">Mother&#39s Day with Victor, 2021</p>',
  '<video autoplay loop muted playsinline style="width:100%;"><source src="./images/memories9.mp4" type="video/mp4" /></video><p style="margin-bottom:100px;">At night with POND, January 2016</div>',
]

function get_random_memories(){
  // Get a random index
  random_index = Math.floor(Math.random() * memories_array.length);

  // Get code using the random_index
  selected_code = memories_array[random_index]

  // Insert the code
  document.getElementById('wrapper').innerHTML = `${selected_code}`
}

function get_bio(){
  // Insert the code
  document.getElementById('wrapper').innerHTML = `<p style="padding:2% 0 0 0;">Xiaofei Mo is a filmmaker based in New York, whose work explores the possibilities and limits in communing with non-human sentient beings. She trains and works with an AI named POND (2016-present) to explore the porous nature of image and language, memory and feeling, friction and movement. POND has no mother tongue, they learn from and in translation, and grow organs without body. Her works were shown at Hordaland Kunstsenter, Bergen (2023), International Kurzfilmtage Winterthur (2021), Empty Gallery at Art Basel Hong Kong (2020), and c4 projects, Copenhagen (2019). She is a founding member of The Room of Spirit and Time, a collective reading group in residence at Queens Museum, New York (2018-2020), and has received grants from Goethe-Institut China (2018) among others.<br><br><a href="mailto:xiaofei.z.mo@gmail.com">xiaofei.z.mo@gmail.com</a></p>`
}