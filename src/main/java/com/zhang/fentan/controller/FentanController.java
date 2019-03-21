package com.zhang.fentan.controller;

import com.zhang.fentan.dto.DetailDto;
import com.zhang.fentan.dto.ExcelDto;
import com.zhang.fentan.exception.AuthorException;
import com.zhang.fentan.service.FentanService;
import com.zhang.fentan.util.ExcelImportUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description
 * @Date 2019-03-08 16:26
 * @Created Mr.zhang
 */
@RestController
@RequestMapping("/fentan")
public class FentanController {

    @Autowired
    FentanService fentanService;

    /**
     * 读入excel
     * @param file
     * @throws Exception
     */
    @PostMapping("/upload")
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        if (file.isEmpty()) {
            resultMap.put("head", "000");
            resultMap.put("datas", "请选择需要导入的文件");
            return resultMap;
        }
        try {

            Map<String, String> headMap = new HashMap<String, String>();
            headMap.put("route", "线路");
            headMap.put("center_one", "转运中心1");
            headMap.put("scale_one", "分摊比例1");
            headMap.put("center_two", "转运中心2");
            headMap.put("scale_two", "分摊比例2");
            headMap.put("center_three", "转运中心3");
            headMap.put("scale_three", "分摊比例3");
            headMap.put("center_four", "转运中心4");
            headMap.put("scale_four", "分摊比例4");
            headMap.put("center_five", "转运中心5");
            headMap.put("scale_five", "分摊比例5");

            InputStream inputStream = file.getInputStream();
            String[] fileds = {"route", "center_one", "scale_one", "center_two", "scale_two", "center_three", "scale_three", "center_four", "scale_four", "center_five", "scale_five"};

            List<ExcelDto> excelData = ExcelImportUtil.importExcel(inputStream, ExcelDto.class, fileds);

            List<ExcelDto> resultData = fentanService.countFenTan(excelData);

            resultMap.put("head", headMap);
            resultMap.put("datas", resultData);
            return resultMap;
        } catch (AuthorException e) {
            resultMap.put("head", "000");
            resultMap.put("datas", e.getMessage());
            return resultMap;
        } catch (Exception e) {
            resultMap.put("head", "000");
            resultMap.put("datas", "系统异常请联系管理员");
            return resultMap;
        }

    }

    @PostMapping("/detail")
    public Map<String, Object> detail(@RequestBody DetailDto detailDto){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        try{
            List<ExcelDto> resultData = fentanService.getDetail(detailDto);
            resultMap.put("head", "111");
            resultMap.put("datas", resultData);
            return resultMap;
        } catch (AuthorException e){
            resultMap.put("head", "000");
            resultMap.put("datas", e.getMessage());
            return resultMap;
        } catch (Exception e){
            resultMap.put("head", "000");
            resultMap.put("datas", "系统异常请联系管理员");
            return resultMap;
        }
    }

}
