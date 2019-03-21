package com.zhang.fentan.service;

import com.zhang.fentan.dto.DetailDto;
import com.zhang.fentan.dto.ExcelDto;
import com.zhang.fentan.exception.AuthorException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description 分摊计算逻辑
 * @Date 2019-03-11 14:59
 * @Created Mr.zhang
 */
@Slf4j
@Service
public class FentanService {

    public static List<ExcelDto> dealData = new ArrayList<>();

    public List<ExcelDto> countFenTan(List<ExcelDto> excelData){
        //剔除多个转运中心的数据
        dealData.clear();
        int rowNum = 1;
        for(ExcelDto excelDto : excelData){
            if(StringUtils.isBlank(excelDto.getCenter_three())
                    && StringUtils.isBlank(excelDto.getScale_three())
                    && StringUtils.isBlank(excelDto.getCenter_four())
                    && StringUtils.isBlank(excelDto.getScale_four())
                    && StringUtils.isBlank(excelDto.getCenter_five())
                    && StringUtils.isBlank(excelDto.getScale_five())){
                excelDto.setId(rowNum++);
                dealData.add(excelDto);
            }
        }

        List<ExcelDto> resultData = new ArrayList<>();
        for(ExcelDto excelDto : dealData){
            try {
                BigDecimal flagNum = new BigDecimal("1");
                BigDecimal scaleOne = new BigDecimal(excelDto.getScale_one());
                BigDecimal scaleTwo = new BigDecimal(excelDto.getScale_two());
                BigDecimal addResult = scaleOne.add(scaleTwo);

                if(flagNum.compareTo(addResult) != 0){
                    resultData.add(excelDto);
                }
            } catch (Exception e){
                throw new AuthorException("请检查数据格式：线路："+excelDto.getRoute());
            }
        }

        return resultData;
    }

    public List<ExcelDto> getDetail(DetailDto detailDto){
        List<ExcelDto> resultData = new ArrayList<>();
        for(ExcelDto excelDto : dealData){
            if(StringUtils.equals(excelDto.getCenter_one(),detailDto.getCenterOne())
                    &&StringUtils.equals(excelDto.getCenter_two(),detailDto.getCenterTwo())
                    ||StringUtils.equals(excelDto.getCenter_one(),detailDto.getCenterTwo())
                    &&StringUtils.equals(excelDto.getCenter_two(),detailDto.getCenterOne())
                    ){
                resultData.add(excelDto);
            }
        }
        return resultData;
    }
}
