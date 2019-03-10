package com.zhang.fentan.controller;

import com.zhang.fentan.util.ExcelImportUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * @Description TODO
 * @Date 2019-03-08 16:26
 * @Created Mr.zhang
 */
@RestController
@RequestMapping("/fentan")
public class FentanController {

    @PostMapping("/upload")
    public void upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            //todo
        }
        try {
            Map<String, Object> resultMap = new HashMap<String, Object>();
            Map<String, String> headMap = new HashMap<String, String>();
            headMap.put("pdaCode", "巴枪唯一码");
            headMap.put("supplierCode", "供应商编码");
            headMap.put("supplierName", "供应商名称");
            headMap.put("pdaType", "产品类型");

            InputStream inputStream = file.getInputStream();
            String[] fileds = {"pdaCode", "supplierCode", "supplierName", "pdaType"};

            List<PdaRegisterExcelDto> excelData = ExcelImportUtil.importExcel(inputStream, PdaRegisterExcelDto.class, fileds);
            // 校验excel文件数据
            pdaResisterService.checkExcelData(excelData);
            resultMap.put("head", headMap);
            resultMap.put("datas", excelData);
            return buildSuccessed(resultMap);
        } catch (Exception e) {
            return buildFailed(e.getMessage());
        }
    }
}
