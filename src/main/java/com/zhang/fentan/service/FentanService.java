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

        List<ExcelDto> errorData = new ArrayList<>();
        for(ExcelDto excelDto : dealData){
            if(Integer.parseInt(excelDto.getScale_one())+Integer.parseInt(excelDto.getScale_two()) != 1){
                errorData.add(excelDto);
            }
        }

        List<ExcelDto> resultData = new ArrayList<>();
        for(ExcelDto excelDto : errorData){
            for(ExcelDto tempDto : dealData){
                if(StringUtils.equals(excelDto.getCenter_one(),tempDto.getCenter_one())
                        &&StringUtils.equals(excelDto.getCenter_two(),tempDto.getCenter_two())
                        ||StringUtils.equals(excelDto.getCenter_one(),tempDto.getCenter_two())
                        &&StringUtils.equals(excelDto.getCenter_two(),tempDto.getCenter_one())
                ){

                }
            }
        }
        

/*        for(ExcelDto excelDto : dealData){

            boolean flag = true;
            List<ExcelDto> tempData = new ArrayList<>();

            for(ExcelDto containDto : dealData){
                if(StringUtils.equals(excelDto.getStart_site(), containDto.getEnd_site())){
                    tempData.add(containDto);
                    if(!StringUtils.equals(excelDto.getScale_one(), containDto.getScale_two())
                            || !StringUtils.equals(excelDto.getScale_two(), containDto.getScale_one())){
                        flag = false;
                    }
                }
            }

            if(!flag){
                for(ExcelDto tempDto : tempData){
                    resultData.add(tempDto);
                }
            }

        }*/

        return resultData;
    }
}
