$(document).ready(function () {

  const $addBtn = $('<button class="add-to-dt">Add</button>');
  const $addButtonArea = $('<div class="add-btn-area"></div>');
  $addButtonArea.append($addBtn);
  const $added = $('<span class="added" style="display:none"><i class="material-icons">check_circle_outline</i> Added</span>');
  $addButtonArea.append($added);
  let searchQuery = '';

  const myWebResultsRenderedCallback = function() {
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
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        title: null,
        filename: function () {
          const date = new Date();
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const hour = ("0" + date.getHours()).slice(-2);
          const minut = ("0" + date.getMinutes()).slice(-2);
          const second = ("0" + date.getSeconds()).slice(-2);
          return 'CustomSearch_' + year + month + day + '-' + hour + minut + second;
        },
        messageTop: null,
        exportOptions: {
          orthogonal: 'filter',
          modifier: {
            page: 'all'
          }
        },
        customizeData: function(data) {
        }
      },
    ],
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
        title: "Article Date",
        data: 'article_date',
        visible: false
      },
      {
        title: "Snippet",
        data: 'snippet',
        visible: false
      },
      {
        title: "Added at",
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
      added_at: (new Date()).toLocaleString()
    });
    dTable.columns.adjust().draw();
    $(this).hide();
    $result.find('.added').show();
  });

});

