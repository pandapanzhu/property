package com.property.test.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
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

    @NotNull
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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public Boolean getPay() {
        return isPay;
    }

    public void setPay(Boolean pay) {
        isPay = pay;
    }

    public String getAddress() {
        return address;
    }

    public PropertyMoney address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getShould() {
        return should;
    }

    public PropertyMoney should(BigDecimal should) {
        this.should = should;
        return this;
    }

    public void setShould(BigDecimal should) {
        this.should = should;
    }

    public Boolean isIsPay() {
        return isPay;
    }

    public PropertyMoney isPay(Boolean isPay) {
        this.isPay = isPay;
        return this;
    }

    public void setIsPay(Boolean isPay) {
        this.isPay = isPay;
    }

    public Integer getYear() {
        return year;
    }

    public PropertyMoney year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public PropertyMoney month(Integer month) {
        this.month = month;
        return this;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public String getRemark() {
        return remark;
    }

    public PropertyMoney remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDlt() {
        return dlt;
    }

    public PropertyMoney dlt(Integer dlt) {
        this.dlt = dlt;
        return this;
    }

    public void setDlt(Integer dlt) {
        this.dlt = dlt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public PropertyMoney createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public PropertyMoney createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public PropertyMoney lastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public PropertyMoney lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
            ", isPay='" + isIsPay() + "'" +
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
