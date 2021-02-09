$(document).ready(function () {

  const $addBtn = $('<button class="add-to-dt">Add</button>');
  const $addButtonArea = $('<div class="add-btn-area"></div>');
  $addButtonArea.append($addBtn);

  myWebResultsRenderedCallback = function(){
    $('.gsc-webResult').each(function(i, e) {
      $(e).append($addButtonArea.clone());
    });
  };

  window.__gcse || (window.__gcse = {});
  window.__gcse.searchCallbacks = {
    web: {
      rendered: 'myWebResultsRenderedCallback',
    },
  };

  const dTable = $('#dtable').DataTable({
    data: [],
    processing: true,
    deferRender: true,
    columns: [
      {
        data: 'url',
        render: function(data, type, row, meta) {
          if (type !== 'display') {
            return data;
          }
          let trimmed = data.substr(0, 27);
          if (trimmed !== data) {
            trimmed += '...';
          }
          return trimmed;
        }
      },
      {
        data: 'title'
      },
      {
        data: 'breadcrumbs'
      },
      {
        data: 'article_date'
      },
      {
        data: 'added_at',
        visible: false
      },
      {
        data: 'snipet',
        visible: false
      }
    ]
  });

});

