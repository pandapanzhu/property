package com.property.test.domain;

import lombok.*;
import org.apache.commons.lang3.RandomUtils;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A PropertyMoney.
 */
@Entity
@Table(name = "PropertyMoney")
public class PropertyMoney implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "user_id")
    private String userId;

    @Column(name = "address")
    private String address;

    @NotNull
    @Column(name = "should", precision = 10, scale = 2, nullable = false)
    private BigDecimal should;

    @Column(name = "is_pay", nullable = false)
    private Boolean isPay;

    @Column(name = "jhi_year")
    private Integer year;

    @Column(name = "month")
    private Integer month;

    @Column(name = "remark")
    private String remark;

    @Column(name = "dlt")
    private Integer dlt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getShould() {
        return should;
    }

    public void setShould(BigDecimal should) {
        this.should = should;
    }

    public Boolean getPay() {
        return isPay;
    }

    public void setIsPay(Boolean pay){
        this.isPay = pay;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDlt() {
        return dlt;
    }

    public void setDlt(Integer dlt) {
        this.dlt = dlt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public PropertyMoney(Stuff stuff) {
        this.userId = stuff.getUserId();
        this.address =stuff.getAddress();
        this.should = new BigDecimal(RandomUtils.nextInt(100,300)); //100到300的随机数
        this.isPay = Boolean.FALSE;
        this.year = LocalDate.now().getYear();
        this.month = LocalDate.now().getMonthValue();
    }

    public PropertyMoney() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PropertyMoney propertyMoney = (PropertyMoney) o;
        if (propertyMoney.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), propertyMoney.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PropertyMoney{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", should=" + getShould() +
            ", isPay='" + getPay() + "'" +
            ", year='" + getYear() + "'" +
            ", month='" + getMonth() + "'" +
            ", remark='" + getRemark() + "'" +
            ", dlt=" + getDlt() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
