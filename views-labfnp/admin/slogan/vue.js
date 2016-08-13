var COMMON = {
  DOUBLE_CLICK_TIME_PERIOD: 250,
  DEFAULT_INDEX: -1,
  DEFAULT_AVATAR: "/assets/admin/img/avatars/default.png",
};

var itemBeforeEdit = {};
var sloganAppModel = {
  data: {
    item: {
      avatar: '',
      displayName: '',
      content: '',
      source: ''

    },
    items: [],
  },
  view: {
    table: {
      selectIndex: COMMON.DEFAULT_INDEX,
    },
  }
}

var sloganApp = new Vue({
  data: sloganAppModel,
  methods: {
    cancel: function (event) {
      sloganApp.onLeavePageEdit(function() {
        location.href = '/admin/#/admin/slogan';
      });
    },
    save: function (event) {
      $.ajax({
        url: '/api/slogan',
        type: 'POST',
        dataType: 'json',
        data: sloganAppModel.data.item,
        xhrFields: {
          withCredentials: true,
        },
        success: ajaxSuccess,
        error: ajaxError,
      });

      function ajaxSuccess(result) {
        location.href = '/admin/#/admin/slogan';
        messageApp.show({desc: '新增slogan成功！', type: 'success'});
      } // end ajaxSuccess

      function ajaxError(result) {
        messageApp.show({desc: '新增slogan失敗！errorMessage: ' + result.responseJSON.message, type: 'error'});
      }
    },
    update: function (event) {
      $.ajax({
        url: '/api/slogan/' + sloganAppModel.data.item.id,
        type: 'PUT',
        dataType: 'json',
        data: sloganAppModel.data.item,
        xhrFields: {
          withCredentials: true,
        },
        success: ajaxSuccess,
        error: ajaxError,
      });

      function ajaxSuccess(result) {
        location.href = '/admin/#/admin/slogan';
        messageApp.show({desc: '更新slogan資料成功！', type: 'success'});
      } // end ajaxSuccess

      function ajaxError(result) {
        console.log(result);
        messageApp.show({desc: '更新slogan失敗！errorMessage: ' + result.responseJSON.message, type: 'error'});
      }
    },
    loadItem: function (cb) {
      window.onbeforeunload = null;
      $.get('/api/slogan/' + sloganAppModel.data.item.id, ajaxSuccess);

      function ajaxSuccess(result) {
        console.log("loadItem result.data=>", result.data);
        if (result.success) {
          sloganAppModel.data.item = result.data;
          sloganAppModel.data.option.passwordConfirm = result.data.Passports[0].password;
          var hasAvatar = typeof result.data.avatar === 'string';
          if (!hasAvatar) {
            sloganAppModel.data.item.avatar = COMMON.DEFAULT_AVATAR;
          }
        }
        if (typeof cb !== 'undefined') setTimeout(cb, 0);
        console.log("loadItem sloganAppModel.data.item=>", sloganAppModel.data.item);
      } // end ajaxSuccess
    },
    setupForm: function(type) {
      if (type === 'edit') {
        $('label.slogan').removeClass('state-disabled');
        $('input[name="slogan"]').removeAttr('chekced');
        $('input[name="slogan"]').removeAttr('disabled');
      }
      var registerForm = $("#slogan-form");
      registerForm.validate({
        // Rules for form validation
        rules : {

          content : {
            required : true
          },
          source : {
            required : true
          },

        },

        // Messages for form validation
        messages : {
          content : {
            required : '請輸入內容'
          },
          source : {
            required : '請輸入來源'
          },
        },

        // Do not change code below
        errorPlacement : function(error, element) {
          error.insertAfter(element.parent());
        },

        submitHandler: function(form) {
          if (type == 'create') {
            sloganApp.save();
            return false;
          } else if(type == 'edit') {
            sloganApp.update();
            return false;
          }
        }
      });
    },
    isPageEditDataModified: function() {
      var itemBeforeLeave = JSON.stringify(sloganAppModel.data.item);
      var isDataModified = itemBeforeEdit !== itemBeforeLeave;
      if (!isDataModified) window.onbeforeunload = null;
      return isDataModified;
    },
    onEnterPageEdit: function() {
      itemBeforeEdit = JSON.stringify(sloganAppModel.data.item);
      console.log("itemBeforeEdit=>", JSON.parse(itemBeforeEdit));
      window.onbeforeunload = function(e) {
        if (sloganApp.isPageEditDataModified()) {
          var message = '您已經修改過資料，是否確定要放棄本次的修改？';
          e.returnValue = message;
          return message;
        }
      };
    },
    onLeavePageEdit: function(cb) {
      if (sloganApp.isPageEditDataModified()) {
        var msgInfo = {
          title: '注意',
          content: '您已經修改過資料，是否確定要放棄本次的修改？',
          btnArray: ['放棄', '取消'],
        };
        var action = function(ButtonPressed) {
          if (ButtonPressed === '放棄') {
            setTimeout(function() {
              return cb();
            }, 500);
          }
        };
        messageApp.confirm(msgInfo, action);
      } else return cb();
    },
    loadItems: function (cb) {
      window.onbeforeunload = null;
      $.get('/api/slogan', ajaxSuccess);

      function ajaxSuccess(result) {
        console.log(`result::::${result}`);
        sloganAppModel.data.items = result.data.items;
        if (typeof cb !== 'undefined') setTimeout(cb, 0);
      } // end ajaxSuccess
    },
    renderTable: function() {
      /* BASIC ;*/
     var responsiveHelper_slogan_table = undefined;
     var responsiveHelper_datatable_fixed_column = undefined;
     var responsiveHelper_datatable_col_reorder = undefined;
     var responsiveHelper_datatable_tabletools = undefined;

     var breakpointDefinition = {
       tablet : 1024,
       phone : 480
     };
     /* TABLETOOLS */
     var table = $('#slogan-table').dataTable({
       // Tabletools options:
       //   https://datatables.net/extensions/tabletools/button_options
       "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f>T<'hidden-xs'l>r>" +
           "t"+
           "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
       "oLanguage": {
          "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
          "sInfo": "顯示 _START_ 到 _END_ 總共 _TOTAL_ 筆紀錄",
         	"sInfoPostFix":  "",
         	"sInfoEmpty":    "顯示第 0 至 0 項結果，共 0 項",
         	"sInfoFiltered": "(從 _MAX_ 項結果中過濾)",
         	"sProcessing":   "處理中...",
         	"sLoadingRecords": "載入中...",
         	"sLengthMenu":   "顯示 _MENU_ 項結果　",
         	"sZeroRecords":  "沒有符合的結果",
         	"oPaginate": {
         		"sFirst":    "第一頁",
         		"sPrevious": "上一頁",
         		"sNext":     "下一頁",
         		"sLast":     "最後一頁"
         	},
         	"sAria": {
         		"sortAscending":  ": 升冪排列",
         		"sortDescending": ": 降冪排列"
         	}
       },
      "columnDefs": [
        {
          "targets"  : 'no-sort',
          "orderable": false,
        },
      ],
       "oTableTools": {
         "aButtons": [
           {
             "sExtends": "text",
             "sButtonText": "檢視",
             "fnClick": function ( nButton, oConfig, oFlash ) {
               var isSelected = data.item.sloganAppModel.view.table.selectIndex !== COMMON.DEFAULT_INDEX;
               if (isSelected) {
                 var index = sloganAppModel.view.table.selectIndex;
                 var sloganId = sloganAppModel.data.items[index].id;
                 location.href = '/admin/#/admin/slogan/show/' + sloganId;
               } else {
                 messageApp.show({desc: '請選擇Slogan', type: 'warning'});
               }
             }
           },
           {
             "sExtends": "text",
             "sButtonText": "新增",
             "fnClick": function ( nButton, oConfig, oFlash ) {
               location.href = '/admin/#/admin/slogan/create';
             }
           },
           {
             "sExtends": "text",
             "sButtonText": "編輯",
             "fnClick": function ( nButton, oConfig, oFlash ) {
               var isSelected = sloganAppModel.view.table.selectIndex !== COMMON.DEFAULT_INDEX;
               if (isSelected) {
                 var index = sloganAppModel.view.table.selectIndex;
                 var sloganId = sloganAppModel.data.items[index].id;
                 location.href = '/admin/#/admin/slogan/edit/' + sloganId;
               } else {
                 messageApp.show({desc: '請選擇Slogan', type: 'warning'});
               }
             }
           },
         ]
       },
       "autoWidth" : true,
       "preDrawCallback" : function() {
         // Initialize the responsive datatables helper once.
         if (!responsiveHelper_datatable_tabletools) {
           responsiveHelper_datatable_tabletools = new ResponsiveDatatablesHelper($('#slogan-table'), breakpointDefinition);
         }
       },
       "rowCallback" : function(nRow) {
         responsiveHelper_datatable_tabletools.createExpandIcon(nRow);
       },
       "drawCallback" : function(oSettings) {
         responsiveHelper_datatable_tabletools.respond();
       }
     });

     // selection
     table.on('click', 'tr', function () {
       if ( $(this).hasClass('selected') ) {
         $(this).removeClass('selected');
       } else {
         $('#slogan-table tbody tr').removeClass('selected');
         $(this).addClass('selected');
       }
     });

     $('#slogan-table-widget').fadeIn();
    },
    dblclick: function(index) {
      var sloganId = sloganAppModel.data.items[index].id;
      this.show(sloganId);
    },
    selection: function (index) {
      if (index !== sloganAppModel.view.table.selectIndex) {
        sloganAppModel.view.table.selectIndex = index;
        console.log("sloganAppModel.view.table.selectIndex", sloganAppModel.view.table.selectIndex);
      } else {
        sloganAppModel.view.table.selectIndex = COMMON.DEFAULT_INDEX;
      }
    },
    show: function (sloganId) {
      location.href = '/admin/#/admin/slogan/show/' + sloganId;
    },
    edit: function (sloganId) {
      location.href = '/admin/#/admin/slogan/edit/' + sloganId;
    },
    delete: function() {
      messageApp.confirm({
        title: '刪除',
        content: '確認刪除此筆資料？',
        btnArray: ['刪除', '取消'],
      },
      function(ButtonPressed) {
        if (ButtonPressed ==='刪除') {
          $.ajax({
            url: '/api/slogan/' + sloganAppModel.data.item.id,
            type: 'DELETE',
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            },
            success: ajaxSuccess,
            error: ajaxError,
          });

          function ajaxSuccess(result) {
            sloganAppModel.view.table.selectIndex = COMMON.DEFAULT_INDEX;
            messageApp.show({desc: `刪除Slogan成功！`, type: 'success'});
            setTimeout(function() {
              location.href = '/admin/#/admin/slogan';
            }, 500);
          } // end ajaxSuccess

          function ajaxError(result) {
            messageApp.show({desc: '刪除Slogan失敗！errorMessage: ' + result.responseJSON.message, type: 'error'});
          }
        }
      });
    }
  },
});
