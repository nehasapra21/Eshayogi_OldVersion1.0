import React from 'react'
import { Component } from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

const exportExcel = (props) => {
  const makeExcelFile = (fileData, fileName) => {
    let csvData = ''
    switch (fileName) {
      case 'COMPLAINT':
        csvData = fileData.map((data) => {
          let date = new Date(data.createdAt)
          let followUp1 =
            data.request.followUp1 !== undefined &&
            data.request.followUp1 !== ''
              ? new Date(data.request.followUp1)
              : ''
          let followUp2 =
            data.request.followUp2 !== undefined &&
            data.request.followUp2 !== ''
              ? new Date(data.request.followUp2)
              : ''
          return {
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenMobileNumber,
            'Citizen Name': data.request.citizenName,
            Comments: data.request.comments,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            Department: data.request.department,
            Description: data.request.description,
            'Follow Up 1':
              followUp1 !== ''
                ? `${followUp1.getDate()}/${
                    followUp1.getMonth() + 1
                  }/${followUp1.getFullYear()}`
                : '',
            'Follow Up 2':
              followUp2 !== ''
                ? `${followUp2.getDate()}/${
                    followUp2.getMonth() + 1
                  }/${followUp2.getFullYear()}`
                : '',
            Important: data.request.important,
            Location: data.request.location,
            Modifications: data.request.modifications,
            Pincode: data.request.citizenPincode,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedNumber,
            'Reference Number': data.ref,
            Status: data.status,
          }
        })
        break
      case 'JOB':
        csvData = fileData.map((data) => {
          console.log('Making data', data)
          let date = new Date(data.createdAt)

          return {
            'Additional Qualifications':
              data.request.additionalEduQualifications,
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            Comments: data.request.comments,
            'Currently Employed': data.request.currentlyEmployed ? 'Yes' : 'No',
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            'Experience Months': data.request.experienceMonths,
            'Experience Years': data.request.experienceYears,
            'Highest Qualification': data.request.highestQualification
              ? 'Yes'
              : 'No',
            'Last Salary': data.request.lastMonthlySalary,
            Location: data.request.location,
            Modifications: data.request.modifications,
            Pincode: data.request.citizenPincode,
            'Preferred Sector': data.request.preferredSector,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedName,
            'Reference Number': data.ref,
            'Shared To Designation': data.request.sharedToDesignation,
            'Shared to Name': data.request.sharedToName,
            'Shared to Number': data.request.sharedToNumber,
            'Shared to Organisation': data.request.sharedToOrganisation,
            Status: data.request.status,
          }
        })
        break

      case 'EVENT':
        csvData = fileData.map((data) => {
          console.log('Making data', data)
          let date = new Date(data.createdAt)
          let eventDate = new Date(data.request.eventDate)
          return {
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            City: data.request.city,
            Comments: data.request.comments,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            'Event Date': `${eventDate.getDate()}/${
              eventDate.getMonth() + 1
            }/${eventDate.getFullYear()}`,
            'Event Title': data.request.eventTitle,
            Important: data.request.important,
            Location: data.request.location,
            Organisation: data.request.organisation,
            Pincode: data.request.citizenPincode,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedName,
            'Reference Number': data.ref,
            Status: data.request.status,
            Time: data.request.time,
          }
        })
        break

      case 'POLITICALEVENT':
        csvData = fileData.map((data) => {
          console.log('Making data', data)
          let date = new Date(data.createdAt)
          let eventDate = new Date(data.request.eventDate)
          return {
            Block: data.request.block,
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            City: data.request.city,
            Comments: data.request.comments,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            'Event Date': `${eventDate.getDate()}/${
              eventDate.getMonth() + 1
            }/${eventDate.getFullYear()}`,
            'Event Title': data.request.eventTitle,
            'Gram Panchayat': data.request.gramPanchayat,
            Important: data.request.important,
            Location: data.request.location,
            Organisation: data.request.organisation,
            Pincode: data.request.citizenPincode,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedName,
            'Reference Name': `${data.request.referenceFirstName} '' ${data.request.referenceLastName}`,
            'Reference Number': data.ref,
            Status: data.request.status,
            Time: data.request.time,
            'Vidhan Sabha': data.request.vidhanSabha,
          }
        })
        break

      case 'MPLAD':
        csvData = fileData.map((data) => {
          console.log('Making data', data)
          let date = new Date(data.createdAt)
          return {
            Block: data.request.block,
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            City: data.request.city,
            Constituency: data.request.constituency,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            'Gram Panchayat':
              typeof data.request.gramPanchayat === 'string' ||
              data.request.gramPanchayat === ''
                ? data.request.gramPanchayat
                : data.request.gramPanchayat.length !== 0
                ? data.request.gramPanchayat[0].name
                : '',
            Location: data.request.location,
            Organisation: data.request.organisation,
            Pincode: data.request.citizenPincode,
            'Financial Year': data.request.financialYear,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedName,
            'Reference Number': data.ref,
            Remarks: data.request.remarks,
            'Sanctioned Amount': data.request.financialSanctionedAmount,
            Status: data.request.status,
            'Vidhan Sabha':
              typeof data.request.vidhanSabha === 'string' ||
              data.request.vidhanSabha === ''
                ? data.request.vidhanSabha
                : data.request.vidhanSabha.length !== 0
                ? data.request.vidhanSabha[0].name
                : '',
            'Work Name': data.request.workName,
            'Work Category': data.request.workCategory,
            'Work Description': data.request.workDescription,
          }
        })
        break

      case 'PNR':
        csvData = fileData.map((data) => {
          console.log('Making data', data)
          let date = new Date(data.createdAt)
          let journeyDate = new Date(data.request.dateOfJourney)
          return {
            Category: data.request.category,
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            City: data.request.city,
            Constituency: data.request.constituency,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            'Journey Date': `${journeyDate.getDate()}/${
              journeyDate.getMonth() + 1
            }/${journeyDate.getFullYear()}`,
            Location: data.request.location,
            Organisation: data.request.organisation,
            Pincode: data.request.citizenPincode,
            PNR: data.request.pnr,
            'Train Number': data.request.trainNumber,
            From: data.request.sectorFrom,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedName,
            'Reference Number': data.ref,
            Status: data.request.status,
            To: data.request.sectorTo,
          }
        })
        break

      case 'LETTERS':
        csvData = fileData.map((data) => {
          let date = new Date(data.createdAt)
          let followUp1 =
            data.request.followUp1 !== undefined &&
            data.request.followUp1 !== ''
              ? new Date(data.request.followUp1)
              : ''
          let followUp2 =
            data.request.followUp2 !== undefined &&
            data.request.followUp2 !== ''
              ? new Date(data.request.followUp2)
              : ''
          let urls = []
          if (data.request.attachments) {
            for (let i = 0; i < data.request.attachments.length; i++) {
              urls.push(data.request.attachments[i].url)
            }
            urls = urls.join(' ,')
          } else {
            urls = ''
          }
          return {
            'Citizen Address': data.request.citizenAddress,
            'Citizen Mobile Number': data.request.citizenPhone,
            'Citizen Name': data.request.citizenName,
            Date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            Location: data.request.location
              ? data.request.location[0].name
              : '',
            Pincode: data.request.citizenPincode,
            From: data.request.recommendedName,
            'Recommended Name': data.request.recommendedName,
            'Recommended Number': data.request.recommendedNumber,
            'DO Number': data.ref,
            Reference: data.request.reference,
            Status: data.request.status,
            To: data.request.to,
            'Follow Up 1':
              followUp1 !== ''
                ? `${followUp1.getDate()}/${
                    followUp1.getMonth() + 1
                  }/${followUp1.getFullYear()}`
                : '',
            'Follow Up 2':
              followUp2 !== ''
                ? `${followUp2.getDate()}/${
                    followUp2.getMonth() + 1
                  }/${followUp2.getFullYear()}`
                : '',
            'Folder Number': data?.meta?.number || '',
            'Folder Name': data?.meta?.name || '',
            Attachment: urls,
            Acknowlegement: data?.request?.acknowlegement || '',
          }
        })
        break

      default:
        return (csvData = '')
        break
    }

    let date = new Date()

    console.log('CSVdata', csvData)
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(
      data,
      fileName +
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` +
        fileExtension
    )
  }

  return {
    makeExcelFile,
  }
}

export default exportExcel()
