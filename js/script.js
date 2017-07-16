$(window).ready(function() {

    var cell = $('.cell-board').find('.cell');

    function fillCellBoard(number, className) {

        var targetRow = parseInt(number / 10);
        var targetCol = number % 10;


        for (var i = 0; i <= number; i++) {

            if (parseInt(i / 10) <= targetRow && i % 10 <= targetCol) {
                $(cell[i]).addClass('' + className);
            }

        }

    }

    function createTable(rows, cols) {

        var tableCode = '<table class="table-generated">\n';

        for (var i = 0; i < rows; i++) {

            tableCode += '<tr>\n';

            for (var j = 0; j < cols; j++) {

                tableCode += '<td class="cell_' + i + "-" + j + '"></td>\n'

            }

            tableCode += '</tr>\n';

        }

        tableCode += '</table>';

        $('.table-board').html(tableCode);

    }

    function fillCellEditing() {

        $('.cell-editing div').addClass('disabled');

        var currentCell = $('.table-board td.active');
        var cellsRow = $(currentCell).parent().find('td');
        var currentIndex = $(currentCell).index();
        var currentRow = $(currentCell).parent().index();
        var cellsColsArray = $(currentCell).parents('table').find('tr');
        var currentRowspan = ($(currentCell).attr('rowspan')) ? parseInt($(currentCell).attr('rowspan')) : 1;
        var currentColspan = ($(currentCell).attr('colspan')) ? parseInt($(currentCell).attr('colspan')) : 1;

        // for cell-editing-right
        var rightCell;
        var rightCellsArray = $(currentCell).parent().find('td').not('.hidden');
        for (var a = 0; a < rightCellsArray.length; a++) {
            if ($(rightCellsArray[a]).hasClass('active')) {
                rightCell = rightCellsArray[a+1];
                break;
            }
        }
        var rightRowspan = ($(rightCell).attr('rowspan')) ? parseInt($(rightCell).attr('rowspan')) : 1;

        for (var i = cellsRow.length - 1; i >= 0; i--) {
            if ($(cellsRow[i]).hasClass('active')) {
                break;
            }
            if (!$(cellsRow[i]).hasClass('hidden')) {
                $('.cell-editing-right').removeClass('disabled');
                break;
            }
        }
        if (currentRowspan !== rightRowspan) {
            $('.cell-editing-right').addClass('disabled');
        }
        if($(cellsRow).eq(currentIndex + currentColspan).hasClass('hidden')) {
            $('.cell-editing-right').addClass('disabled');
        }

        // for cell-editing-left
        var leftCell;
        var leftCellsArray = $(currentCell).parent().find('td').not('.hidden');
        for (var b = 0; b < leftCellsArray.length; b++) {
            if ($(leftCellsArray[b]).hasClass('active')) {
                leftCell = leftCellsArray[b-1];
                break;
            }
        }
        var leftRowspan = ($(leftCell).attr('rowspan')) ? parseInt($(leftCell).attr('rowspan')) : 1;
        var leftColspan = ($(leftCell).attr('colspan')) ? parseInt($(leftCell).attr('colspan')) : 1;

        for (var j = 0; j < cellsRow.length; j++) {
            if ($(cellsRow[j]).hasClass('active')) {
                break;
            }
            if (!$(cellsRow[j]).hasClass('hidden')) {
                $('.cell-editing-left').removeClass('disabled');
                break;
            }
        }
        if (currentRowspan !== leftRowspan) {
            $('.cell-editing-left').addClass('disabled');
        }
        if($(currentCell).prev().hasClass('hidden') && leftColspan + $(leftCell).index() !== currentIndex) {
            $('.cell-editing-left').addClass('disabled');
        }

        // for cell-editing-top
        var topCell;
        var topCellArray = $(currentCell).parents('table').find('tr');
        for (var c = currentRow - 1; c >= 0; c--) {
            if (!$(topCellArray[c]).find('td').eq(currentIndex).hasClass('hidden')) {
                topCell = $(topCellArray[c]).find('td').eq(currentIndex);
                break;
            }
        }
        var topColspan = ($(topCell).attr('colspan')) ? parseInt($(topCell).attr('colspan')) : 1;
        var topRowspan = ($(topCell).attr('rowspan')) ? parseInt($(topCell).attr('rowspan')) : 1;

        for (var k = 0; k < cellsColsArray.length; k++) {
            if ($(cellsColsArray[k]).find('td').eq(currentIndex).hasClass('active')) {
                break;
            }
            if (!$(cellsColsArray[k]).find('td').eq(currentIndex).hasClass('hidden')) {
                $('.cell-editing-top').removeClass('disabled');
                break;
            }
        }
        if (currentColspan !== topColspan) {
            $('.cell-editing-top').addClass('disabled');
        }
        if($(currentCell).parent().prev().find('td').eq(currentIndex).hasClass('hidden') && topRowspan + $(topCell).parent().index() !== currentRow) {
            $('.cell-editing-top').addClass('disabled');
        }

        // for cell-editing-bottom
        var bottomCell;
        var bottomCellArray = $(currentCell).parents('table').find('tr');
        for (var d = currentRow + 1; d < bottomCellArray.length; d++) {
            if (!$(bottomCellArray[d]).find('td').eq(currentIndex).hasClass('hidden')) {
                bottomCell = $(bottomCellArray[d]).find('td').eq(currentIndex);
                break;
            }
        }
        var bottomColspan = ($(bottomCell).attr('colspan')) ? parseInt($(bottomCell).attr('colspan')) : 1;

        for (var m = cellsColsArray.length - 1; m >= 0 ; m--) {
            if ($(cellsColsArray[m]).find('td').eq(currentIndex).hasClass('active')) {
                break;
            }
            if (!$(cellsColsArray[m]).find('td').eq(currentIndex).hasClass('hidden')) {
                $('.cell-editing-bottom').removeClass('disabled');
                break;
            }
        }
        if (currentColspan !== bottomColspan) {
            $('.cell-editing-bottom').addClass('disabled');
        }
        if($(currentCell).parents('table').find('tr').eq(currentRow + currentRowspan).find('td').eq(currentIndex).hasClass('hidden')) {
            $('.cell-editing-bottom').addClass('disabled');
        }

        //for cell-editing-cancel
        if(currentRowspan > 1 || currentColspan > 1) {
            $('.cell-editing-cancel').removeClass('disabled');
        }

    }

    $(cell).hover(
        function() {
            fillCellBoard($(this).index(), 'active');
        },
        function() {
            $(cell).removeClass('active');
        }
    );

    $(cell).click(function() {
        $(cell).removeClass('chosen');
        fillCellBoard($(this).index(), 'chosen');
    });

    $('.to-editing').click(function() {

        for (var currentChoice = cell.length - 1; currentChoice >= 0; currentChoice--) {
            if($(cell[currentChoice]).hasClass('chosen')) {
                break;
            }
        }

        var newRow = parseInt(currentChoice / 10) + 1;
        var newCol = currentChoice % 10 + 1;

        createTable(newRow, newCol);

        $('.table-creating').addClass('complete');

    });

    $('.previous-step').click(function() {

        $('.table-creating').removeClass('complete');

    });

    $('.save-table').click(function() {

        $('.table-board table td.hidden').detach();

    });

    $('.table-board').on('click', 'td', function() {

        $('.cell-editing div').removeClass('disabled');

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            fillCellEditing();
        } else {
            $('.table-board td.active').removeClass('active');
            $(this).addClass('active');
            fillCellEditing();
        }

    });

    $('.cell-editing-right').click(function() {

        if (!$(this).hasClass('disabled')) {

            var currentCell = $('.table-board td.active');
            var nextCell;
            var nextCellsArray = $(currentCell).parent().find('td').not('.hidden');

            for (var i = 0; i < nextCellsArray.length; i++) {
                if ($(nextCellsArray[i]).hasClass('active')) {
                    nextCell = nextCellsArray[i+1];
                    break;
                }
            }

            var currentColspan = ($(currentCell).attr('colspan')) ? parseInt($(currentCell).attr('colspan')) : 1;
            var nextColspan = ($(nextCell).attr('colspan')) ? parseInt($(nextCell).attr('colspan')) : 1;

            $(nextCell).addClass('hidden');

            $(currentCell).attr('colspan', currentColspan + nextColspan);

            fillCellEditing();

        }

    });

    $('.cell-editing-left').click(function() {

        if (!$(this).hasClass('disabled')) {

            var currentCell = $('.table-board td.active');
            var prevCell;
            var prevCellsArray = $(currentCell).parent().find('td').not('.hidden');

            for (var i = 0; i < prevCellsArray.length; i++) {
                if ($(prevCellsArray[i]).hasClass('active')) {
                    prevCell = prevCellsArray[i-1];
                    break;
                }
            }

            var currentColspan = ($(currentCell).attr('colspan')) ? parseInt($(currentCell).attr('colspan')) : 1;
            var prevColspan = ($(prevCell).attr('colspan')) ? parseInt($(prevCell).attr('colspan')) : 1;

            $(currentCell).addClass('hidden').removeClass('active');

            $(prevCell).attr('colspan', currentColspan + prevColspan);


            $(prevCell).addClass('active');

            fillCellEditing();

        }

    });

    $('.cell-editing-top').click(function() {

        if (!$(this).hasClass('disabled')) {

            var currentCell = $('.table-board td.active');
            var currentCol = $(currentCell).index();
            var currentRow = $(currentCell).parent().index();

            var topCell;
            var topCellArray = $(currentCell).parents('table').find('tr');
            for (var i = currentRow - 1; i >= 0; i--) {
                if (!$(topCellArray[i]).find('td').eq(currentCol).hasClass('hidden')) {
                    topCell = $(topCellArray[i]).find('td').eq(currentCol);
                    break;
                }
            }

            var currentRowspan = ($(currentCell).attr('rowspan')) ? parseInt($(currentCell).attr('rowspan')) : 1;
            var topRowspan = ($(topCell).attr('rowspan')) ? parseInt($(topCell).attr('rowspan')) : 1;

            $(currentCell).addClass('hidden');

            $(topCell).attr('rowspan', currentRowspan + topRowspan).addClass('active');

            fillCellEditing();

        }

    });

    $('.cell-editing-bottom').click(function() {

        if (!$(this).hasClass('disabled')) {

            var currentCell = $('.table-board td.active');
            var currentCol = $(currentCell).index();
            var currentRow = $(currentCell).parent().index();

            var bottomCell;
            var bottomCellArray = $(currentCell).parents('table').find('tr');
            for (var i = currentRow + 1; i < bottomCellArray.length; i++) {
                if (!$(bottomCellArray[i]).find('td').eq(currentCol).hasClass('hidden')) {
                    bottomCell = $(bottomCellArray[i]).find('td').eq(currentCol);
                    break;
                }
            }

            var currentRowspan = ($(currentCell).attr('rowspan')) ? parseInt($(currentCell).attr('rowspan')) : 1;
            var bottomRowspan = ($(bottomCell).attr('rowspan')) ? parseInt($(bottomCell).attr('rowspan')) : 1;

            $(bottomCell).addClass('hidden');

            $(currentCell).attr('rowspan', currentRowspan + bottomRowspan);

            fillCellEditing();

        }

    });

    $('.cell-editing-cancel').click(function() {

        var currentCell = $('.table-board td.active');
        var currentIndex = $(currentCell).index();
        var currentRow = $(currentCell).parent().index();
        var currentRowspan = ($(currentCell).attr('rowspan')) ? parseInt($(currentCell).attr('rowspan')) : 1;
        var currentColspan = ($(currentCell).attr('colspan')) ? parseInt($(currentCell).attr('colspan')) : 1;
        var rowArray = $(currentCell).parents('table').find('tr');

        for (var i = currentRow; i < currentRow + currentRowspan; i++) {

            for (var j = currentIndex; j < currentIndex + currentColspan; j++) {
                $(rowArray[i]).find('td').eq(j).removeClass('hidden active').attr({'colspan' : 1, 'rowspan' : 1});
            }

        }

        fillCellEditing();

    });

});
