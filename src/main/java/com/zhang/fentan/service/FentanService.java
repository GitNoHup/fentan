package com.zhang.fentan.service;

import com.zhang.fentan.dto.ExcelDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

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

    public List<ExcelDto> countFenTan(List<ExcelDto> excelData){
        //剔除多个转运中心的数据
        List<ExcelDto> dealData = new ArrayList<>();
        for(ExcelDto excelDto : excelData){
            if(StringUtils.isBlank(excelDto.getCenter_three())
                    && StringUtils.isBlank(excelDto.getScale_three())
                    && StringUtils.isBlank(excelDto.getCenter_four())
                    && StringUtils.isBlank(excelDto.getScale_four())
                    && StringUtils.isBlank(excelDto.getCenter_five())
                    && StringUtils.isBlank(excelDto.getScale_five())){
                dealData.add(excelDto);
            }
        }

        List<ExcelDto> resultData = new ArrayList<>();
        for(ExcelDto excelDto : dealData){
            String centerOne = excelDto.getCenter_one();
            for(ExcelDto containDto : dealData){
                if(StringUtils.equals(centerOne, containDto.getCenter_two())
                        && (!StringUtils.equals(excelDto.getScale_one(), containDto.getScale_two())
                        || !StringUtils.equals(excelDto.getScale_two(), containDto.getScale_one()))){

                }
            }
        }

        return dealData;
    }
}
