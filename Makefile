ECMA_SOURCES := wizard.js
ECMA_SOURCES += preview.js
ECMA_SOURCES += helper.js
ECMA_SOURCES += chimaera.js
ECMA_SOURCES += base.js
ECMA_SOURCES += hole_A.js
ECMA_SOURCES += hole_B.js
ECMA_SOURCES += keys_simple.js
ECMA_SOURCES += keys_neutral.js
ECMA_SOURCES += keys_piano.js
ECMA_SOURCES += label_chim.js
ECMA_SOURCES += label_omk.js
ECMA_SOURCES += rib_common.js
ECMA_SOURCES += rib_A.js
ECMA_SOURCES += rib_B.js
ECMA_SOURCES += rib_C.js
ECMA_SOURCES += rib_D_Rev3.js
ECMA_SOURCES += rib_D_Rev4.js
ECMA_SOURCES += side.js
ECMA_SOURCES += wrapping.js
ECMA_SOURCES += wrapping_top.js

QCAD_BATCH := qcad -allow-multiple-instances -autostart
XSLTPROC := xsltproc

TARGETS := chimaera_S48_2.0mm.dxf	 chimaera_S48_2.3mm.dxf	 chimaera_S48_2.5mm.dxf
TARGETS += chimaera_S64_2.0mm.dxf	 chimaera_S64_2.3mm.dxf	 chimaera_S64_2.5mm.dxf
TARGETS += chimaera_S80_2.0mm.dxf	 chimaera_S80_2.3mm.dxf	 chimaera_S80_2.5mm.dxf
TARGETS += chimaera_S96_2.0mm.dxf	 chimaera_S96_2.3mm.dxf	 chimaera_S96_2.5mm.dxf
TARGETS += chimaera_S112_2.0mm.dxf chimaera_S112_2.3mm.dxf chimaera_S112_2.5mm.dxf
TARGETS += chimaera_S128_2.0mm.dxf chimaera_S128_2.3mm.dxf chimaera_S128_2.5mm.dxf
TARGETS += chimaera_S144_2.0mm.dxf chimaera_S144_2.3mm.dxf chimaera_S144_2.5mm.dxf
TARGETS += chimaera_S160_2.0mm.dxf chimaera_S160_2.3mm.dxf chimaera_S160_2.5mm.dxf

PREVIEW := chimaera_S144_2.5mm_prev_simple.svg
PREVIEW += chimaera_S144_2.5mm_prev_piano.svg
PREVIEW += chimaera_S144_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S48_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S64_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S80_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S96_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S112_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S128_2.5mm_prev_neutral.svg
#PREVIEW += chimaera_S160_2.5mm_prev_neutral.svg

PONOKO := chimaera_S48_2.3mm.svg
PONOKO += chimaera_S64_2.3mm.svg
PONOKO += chimaera_S80_2.3mm.svg
PONOKO += chimaera_S96_2.3mm.svg
PONOKO += chimaera_S112_2.3mm.svg
PONOKO += chimaera_S128_2.3mm.svg

DWERK := chimaera_S128_2.0mm.pdf		chimaera_S144_2.0mm.pdf	chimaera_S160_2.0mm.pdf

P2_WIDTH := 384
P2_HEIGHT := 384
P3_WIDTH := 790
P3_HEIGHT := 384

TOLERANCE := 0.1 # mm

all: $(TARGETS)

preview: $(PREVIEW)

ponoko: $(PONOKO)

digitalwerkstatt: $(DWERK)

%.pdf:	%.dxf digitalwerkstatt.js
	$(QCAD_BATCH) $(CURDIR)/digitalwerkstatt.js $(CURDIR)/$< $(CURDIR)/$@

chimaera_S48_%.svg: ponoko.xslt chimaera_S48_%.dxf.svg
	$(XSLTPROC) --stringparam new_width $(P2_WIDTH) --stringparam new_height $(P2_HEIGHT) -o $@ $+

%.svg: ponoko.xslt %.dxf.svg
	$(XSLTPROC) --stringparam new_width $(P3_WIDTH) --stringparam new_height $(P3_HEIGHT) -o $@ $+

%.dxf.svg: %.dxf ponoko.js
	$(QCAD_BATCH) $(CURDIR)/ponoko.js $(CURDIR)/$< $(CURDIR)/$@


chimaera_S%_2.0mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu $$(($* / 16)) Mth 2.0 Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S%_2.3mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu $$(($* / 16)) Mth 2.3 Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S%_2.5mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu $$(($* / 16)) Mth 2.5 Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S160_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 10 Mth $* Mto $(TOLERANCE) Lle 5 $(CURDIR)/$@


chimaera_S%_2.5mm_prev_simple.svg: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Pre 1 Key 0 Rev 4 Nsu $$(($* / 16)) Mth 2.5 Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S%_2.5mm_prev_neutral.svg: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Pre 1 Key 1 Rev 4 Nsu $$(($* / 16)) Mth 2.5 Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S%_2.5mm_prev_piano.svg: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Pre 1 Key 2 Rev 4 Nsu $$(($* / 16)) Mth 2.5 Mto $(TOLERANCE) $(CURDIR)/$@

clean:
	rm -f $(TARGETS) $(PONOKO) $(DWERK) $(PREVIEW)
