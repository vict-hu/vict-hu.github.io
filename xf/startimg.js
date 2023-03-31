// Array of image URLs
const startcode = [
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/328106931?h=df95fc8e93&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/481448579?h=93b0e6d624&amp&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/799674183?h=f69d90bdd2&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/812990780?h=32d5b2b0d9&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479/embed" class="video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
  '<img src="./images/work4.jpg">',
  '<img src="./images/work5.jpg">',
  '<img src="./images/collaborations4.jpg">',
  '<img src="./images/memories2.jpg">',
  '<video autoplay loop muted playsinline style="width:100%;"><source src="./images/memories3.mp4" type="video/mp4" /></video>',
  '<img src="./images/memories5.jpg">',
];

  // Get a random index
  random_index = Math.floor(Math.random() * startcode.length);

  // Get code using the random_index
  selected_code = startcode[random_index]

  // Insert the code
  document.getElementById('wrapper').innerHTML = `${selected_code}`
