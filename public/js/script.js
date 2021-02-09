$(document).ready(function () {

  const $addBtn = $('<button class="add-to-dt">Add</button>');
  const $addButtonArea = $('<div class="add-btn-area"></div>');
  $addButtonArea.append($addBtn);

  let searchQuery = '';

  const myWebResultsRenderedCallback = function(){
    $('.gsc-webResult').each(function(i, e) {
      $(e).append($addButtonArea.clone());
    });
  };

  const mySearchStartingCallback = function(gname, query) {
    searchQuery = query;
    return query;
  };

  window.__gcse || (window.__gcse = {});
  window.__gcse.searchCallbacks = {
    web: {
      starting: mySearchStartingCallback,
      rendered: myWebResultsRenderedCallback
    },
  };

  const dTable = $('#dtable').DataTable({
    data: [],
    processing: true,
    deferRender: true,
    columns: [
      {
        data: 'query'
      },
      {
        data: 'title'
      },
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
          return (
            '<a href="' + data + '" target="_blank">'
            + trimmed
            + '</a>'
          );
        }
      },
      {
        data: 'breadcrumbs',
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
        data: 'article_date',
        visible: false
      },
      {
        data: 'snippet',
        visible: false
      },
      {
        data: 'added_at',
        visible: false
      }
    ]
  });

  $('body').on('click', 'button.add-to-dt', function() {
    const $result = $(this).closest('.gsc-webResult');
    const title = $result.find('a.gs-title').first().text();
    const url = $result.find('a.gs-title').first().attr('href');
    const breadcrumbs = $result.find('.gs-visibleUrl.gs-visibleUrl-breadcrumb').first().text();
    const snippet = $result.find('.gs-snippet').first().text();
    dTable.row.add({
      query: searchQuery,
      title: title,
      url: url,
      breadcrumbs: breadcrumbs,
      article_date: null,
      snippet: snippet,
      added_at: new Date()
    });
    dTable.columns.adjust().draw();
  });

});

