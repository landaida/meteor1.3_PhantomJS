import phantom from 'phantom';
phantomCreate = () =>{
  var sitepage = null;
  var phInstance = null;

  phantom.create()
  .then(instance => {
      phInstance = instance;
      return instance.createPage();
  })
  .then(page => {
      sitepage = page;
      sitepage.property('onConsoleMessage', function (msg) {
        console.log(msg);
      });
      return page.open('https://stackoverflow.com/');
  })
  .then(status => {
      console.log(status);
      sitepage.property('onLoadFinished', function(err) {
          console.log(err);
      }).then(function() {
        console.log('onLoadFinished');
        sitepage.evaluate(() => {
          console.log('inside page');
          // return document.getElementById('h-top-questions').innerHTML;
          return $('#h-top-questions').text();
        }).then(function(html){
          console.log(html);
          sitepage.close();
          phInstance.exit();
        });
      });
  })
  .catch(error => {
      console.log(error);
      phInstance.exit();
  });

}
