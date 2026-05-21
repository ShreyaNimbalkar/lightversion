import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { site } from "@/data/site";
import { findCatalogProduct } from "@/lib/quotation-catalog-options";
import {
  formatInr,
  lineAmount,
  quotationTotals,
  type QuotationFormData,
  type QuotationLineItem,
} from "@/lib/quotation-types";

const BRAND = "#ff6b35";
const BRAND_DARK = "#e85a2a";
const SLATE = "#1e2a3b";
const SLATE_LIGHT = "#3d4f66";
const BORDER = "#dde3ea";
const BG_SOFT = "#f4f6f9";
const MUTED = "#64748b";
const WHITE = "#ffffff";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 52,
    paddingHorizontal: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: SLATE,
    backgroundColor: WHITE,
  },
  accentTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: BRAND,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerBrand: {
    flex: 1,
    paddingRight: 16,
  },
  companyName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    letterSpacing: 0.3,
  },
  companyTag: {
    marginTop: 3,
    fontSize: 8,
    color: MUTED,
  },
  docTitle: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: BRAND,
    letterSpacing: 1.2,
  },
  logo: {
    width: 128,
    height: 44,
    objectFit: "contain",
  },
  metaBar: {
    flexDirection: "row",
    backgroundColor: BG_SOFT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    marginBottom: 16,
  },
  metaCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  metaCellLast: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  metaLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
  },
  partiesRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  partyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    overflow: "hidden",
  },
  partyHead: {
    backgroundColor: SLATE,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  partyHeadText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 0.8,
  },
  partyBody: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: WHITE,
  },
  partyLine: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: SLATE,
    marginBottom: 3,
  },
  partyLineBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    marginBottom: 4,
  },
  subjectBox: {
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff7f3",
    borderLeftWidth: 3,
    borderLeftColor: BRAND,
    borderWidth: 1,
    borderColor: "#fde0d4",
  },
  subjectLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: BRAND_DARK,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subjectText: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BRAND,
  },
  catalogBox: {
    marginBottom: 14,
    padding: 10,
    backgroundColor: BG_SOFT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
  },
  catalogItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  catalogBullet: {
    width: 14,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: BRAND,
  },
  catalogText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.45,
    color: SLATE_LIGHT,
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: SLATE,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tableHeadCell: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowAlt: {
    backgroundColor: BG_SOFT,
  },
  tableCell: {
    fontSize: 8.5,
    color: SLATE,
    lineHeight: 1.35,
  },
  tableCellRight: {
    fontSize: 8.5,
    color: SLATE,
    textAlign: "right",
  },
  tableCellBold: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    textAlign: "right",
  },
  colSr: { width: "5%" },
  colDesc: { width: "33%" },
  colHsn: { width: "11%" },
  colQty: { width: "9%" },
  colUnit: { width: "9%" },
  colRate: { width: "15%" },
  colAmt: { width: "18%" },
  totalsCard: {
    alignSelf: "flex-end",
    width: 220,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    overflow: "hidden",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  totalLabel: {
    fontSize: 9,
    color: MUTED,
  },
  totalValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: BRAND,
  },
  grandTotalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
  },
  grandTotalValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
  },
  termsBox: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    backgroundColor: WHITE,
  },
  termsTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    marginBottom: 6,
  },
  termsLine: {
    fontSize: 8,
    lineHeight: 1.5,
    color: MUTED,
    marginBottom: 4,
  },
  signRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },
  signBox: {
    flex: 1,
  },
  signHead: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    marginBottom: 36,
  },
  signLine: {
    borderTopWidth: 1,
    borderTopColor: SLATE,
    paddingTop: 6,
  },
  signCaption: {
    fontSize: 7.5,
    color: MUTED,
    marginTop: 2,
  },
  signName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: SLATE,
    marginTop: 3,
  },
  pageFooter: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  footerText: {
    fontSize: 7,
    color: MUTED,
    maxWidth: "70%",
    lineHeight: 1.4,
  },
  footerPage: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
  },
});

type Props = {
  data: QuotationFormData;
  logoUrl: string;
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function PartyLines({
  name,
  phone,
  email,
  address,
  pincode,
  gstin,
}: {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  gstin: string;
}) {
  const addressLine = [address, pincode].filter(Boolean).join(pincode && address ? " — " : "");

  return (
    <>
      <Text style={styles.partyLineBold}>{name || "—"}</Text>
      {phone ? <Text style={styles.partyLine}>Phone: {phone}</Text> : null}
      {email ? <Text style={styles.partyLine}>Email: {email}</Text> : null}
      {addressLine ? <Text style={styles.partyLine}>Address: {addressLine}</Text> : null}
      <Text style={styles.partyLine}>GSTIN: {gstin || "—"}</Text>
    </>
  );
}

function TableRow({ item, index }: { item: QuotationLineItem; index: number }) {
  const isAlt = index % 2 === 1;
  return (
    <View style={[styles.tableRow, isAlt ? styles.tableRowAlt : {}]}>
      <Text style={[styles.tableCell, styles.colSr]}>{index + 1}</Text>
      <Text style={[styles.tableCell, styles.colDesc]}>{item.description || "—"}</Text>
      <Text style={[styles.tableCell, styles.colHsn]}>{item.hsnSac || "—"}</Text>
      <Text style={[styles.tableCellRight, styles.colQty]}>{item.qty}</Text>
      <Text style={[styles.tableCell, styles.colUnit]}>{item.unit}</Text>
      <Text style={[styles.tableCellRight, styles.colRate]}>{formatInr(item.rate)}</Text>
      <Text style={[styles.tableCellBold, styles.colAmt]}>{formatInr(lineAmount(item))}</Text>
    </View>
  );
}

export function QuotationPdfDocument({ data, logoUrl }: Props) {
  const { subtotal, gstAmount, grandTotal } = quotationTotals(data.lineItems, data.gstPercent);
  const office = site.locations[0];
  const lineItems = data.lineItems.filter((row) => row.description.trim() || row.rate > 0);

  return (
    <Document
      title={`Quotation ${data.quotationNumber}`}
      author={site.brandName}
      subject={data.subject || `Quotation for ${data.clientName}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.accentTop} fixed />

        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <Text style={styles.companyName}>{site.legalName}</Text>
            <Text style={styles.companyTag}>
              Pune & PCMC · Est. {site.establishedYear} · {site.email}
            </Text>
            <Text style={styles.docTitle}>QUOTATION</Text>
          </View>
          {logoUrl ? <Image src={logoUrl} style={styles.logo} /> : null}
        </View>

        <View style={styles.metaBar}>
          <View style={styles.metaCell}>
            <Text style={styles.metaLabel}>Quotation no.</Text>
            <Text style={styles.metaValue}>{data.quotationNumber}</Text>
          </View>
          <View style={styles.metaCell}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{formatDate(data.quotationDate)}</Text>
          </View>
          <View style={styles.metaCellLast}>
            <Text style={styles.metaLabel}>Valid until</Text>
            <Text style={styles.metaValue}>{formatDate(data.validUntil)}</Text>
          </View>
        </View>

        <View style={styles.partiesRow}>
          <View style={styles.partyBox}>
            <View style={styles.partyHead}>
              <Text style={styles.partyHeadText}>FROM</Text>
            </View>
            <View style={styles.partyBody}>
              <PartyLines
                name={site.legalName}
                phone={site.phoneLine}
                email={site.email}
                address={office.lines.join(", ")}
                pincode=""
                gstin={site.gstin}
              />
            </View>
          </View>
          <View style={styles.partyBox}>
            <View style={styles.partyHead}>
              <Text style={styles.partyHeadText}>FOR (CLIENT)</Text>
            </View>
            <View style={styles.partyBody}>
              <PartyLines
                name={data.clientName}
                phone={data.clientPhone}
                email={data.clientEmail}
                address={data.clientAddress}
                pincode={data.clientPincode}
                gstin={data.clientGstin}
              />
            </View>
          </View>
        </View>

        {data.subject ? (
          <View style={styles.subjectBox}>
            <Text style={styles.subjectLabel}>SUBJECT / REFERENCE</Text>
            <Text style={styles.subjectText}>{data.subject}</Text>
          </View>
        ) : null}

        {data.selectedCatalogSlugs.length > 0 ? (
          <View style={styles.catalogBox}>
            <Text style={styles.sectionTitle}>Services & products requested</Text>
            {data.selectedCatalogSlugs.map((slug, index) => {
              const product = findCatalogProduct(slug);
              if (!product) return null;
              return (
                <View key={slug} style={styles.catalogItem}>
                  <Text style={styles.catalogBullet}>{index + 1}.</Text>
                  <Text style={styles.catalogText}>
                    {product.serviceLabel} › {product.categoryTitle} › {product.productName}
                    {"  ·  "}
                    {product.priceFrom}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Pricing details</Text>
        <View style={styles.tableWrap}>
          <View style={styles.tableHead}>
            <Text style={[styles.tableHeadCell, styles.colSr]}>#</Text>
            <Text style={[styles.tableHeadCell, styles.colDesc]}>Description</Text>
            <Text style={[styles.tableHeadCell, styles.colHsn]}>HSN/SAC</Text>
            <Text style={[styles.tableHeadCell, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeadCell, styles.colUnit]}>Unit</Text>
            <Text style={[styles.tableHeadCell, styles.colRate]}>Rate (₹)</Text>
            <Text style={[styles.tableHeadCell, styles.colAmt]}>Amount (₹)</Text>
          </View>
          {lineItems.map((item, index) => (
            <TableRow key={item.id} item={item} index={index} />
          ))}
        </View>

        <View style={styles.totalsCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatInr(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST @ {data.gstPercent}%</Text>
            <Text style={styles.totalValue}>{formatInr(gstAmount)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand total</Text>
            <Text style={styles.grandTotalValue}>{formatInr(grandTotal)}</Text>
          </View>
        </View>

        {data.paymentTerms || data.notes ? (
          <View style={styles.termsBox}>
            <Text style={styles.termsTitle}>Terms & conditions</Text>
            {data.paymentTerms ? (
              <Text style={styles.termsLine}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Payment: </Text>
                {data.paymentTerms}
              </Text>
            ) : null}
            {data.notes ? (
              <Text style={styles.termsLine}>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Notes: </Text>
                {data.notes}
              </Text>
            ) : null}
          </View>
        ) : null}

        <View style={styles.signRow}>
          <View style={styles.signBox}>
            <Text style={styles.signHead}>Client acceptance</Text>
            <View style={styles.signLine}>
              <Text style={styles.signCaption}>Signature & company stamp</Text>
              <Text style={styles.signCaption}>Date: _________________________</Text>
            </View>
          </View>
          <View style={styles.signBox}>
            <Text style={styles.signHead}>For {site.brandName}</Text>
            <View style={styles.signLine}>
              <Text style={styles.signCaption}>Authorised signatory</Text>
              <Text style={styles.signName}>{site.proprietor}</Text>
            </View>
          </View>
        </View>

        <View style={styles.pageFooter} fixed>
          <Text style={styles.footerText}>
            {site.brandName} · {office.lines[0]} · GSTIN {site.gstin}. This is a computer-generated
            quotation; prices and scope are subject to written confirmation.
          </Text>
          <Text
            style={styles.footerPage}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
