package com.zhang.fentan.util;

import com.sun.rowset.internal.Row;
import javafx.scene.control.Cell;
import org.apache.el.util.ReflectionUtil;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description TODO
 * @Date 2019-03-08 16:52
 * @Created Mr.zhang
 */
public class ExcelImportUtil {
    /**
     * 导出数据
     *
     * @param stream
     * @param clazz
     * @param fileds
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> List<T> importExcel(InputStream stream, Class<T> clazz, String[] fileds) throws Exception {
        List<T> list = new ArrayList<>();
        Workbook workbook = createWorkbook(stream);

        Sheet sheet = workbook.getSheetAt(0);
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            T instance = clazz.newInstance();

            Row row = sheet.getRow(i);
            if (row == null) {
                continue;
            }

            for (int j = 1; j <= fileds.length; j++) {
                Cell cell = row.getCell(j);
                if (cell == null) {
                    continue;
                }

                cell.setCellType(Cell.CELL_TYPE_STRING);

                String content = cell.getStringCellValue();
                ReflectionUtil.setFieldValue(instance, fileds[j - 1], content != null ? content.trim() : content);
            }

            list.add(instance);
        }

        return list;
    }


    public static Workbook createWorkbook(InputStream stream) {
        try {
            return WorkbookFactory.create(stream);
        } catch (Exception e) {
            throw new ServiceException("解析EXCEL文件异常");
        }
    }

}
